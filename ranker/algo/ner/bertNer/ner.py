from distutils.command.config import config
import torch
from transformers import BertTokenizerFast

from weights import DownloadWeights

from algo.ner.bertNer.model import BertNamedEntityRecognition
from algo.ner.bertNer.config import Config

__all__ = [
    "config",
]


class NER:

    """
    Class for performing the final named entity recognition task on a resume

    """

    def __init__(self, focal_model=False):

        self.config = Config(
            maxlen=512,
            batch_size=8,
            pretrained=True,
            use_scheduler=True,
            focal_model=focal_model,
        )

        self.model = BertNamedEntityRecognition(self.config)
        self.tokenizer = BertTokenizerFast.from_pretrained("bert-base-cased")

        self.device = self.config.device

        self.model.to(self.device)
        self.load_weights()
        self.model.eval()

    def load_weights(self):

        download = DownloadWeights(weight_file=self.config.model_type)
        download.check_weights()

        weight_path = "weights/{}.pth"
        self.model.load_state_dict(
            torch.load(
                weight_path.format(self.config.model_type), map_location=self.device
            )
        )

        print("Weights Loaded Successfully!")

    def predict(self, raw_text):
        predictions = []
        inputs = []

        text = self.tokenizer(raw_text, add_special_tokens=False, return_tensors="pt")
        text_ = self.tokenizer(raw_text, add_special_tokens=False)
        input_id_chunks = text["input_ids"][0].split(self.config.maxlen - 2)
        mask_chunks = text["attention_mask"][0].split(self.config.maxlen - 2)
        for j in range(len(input_id_chunks)):
            inp_chunk = torch.cat(
                [torch.Tensor([101]), input_id_chunks[j], torch.Tensor([102])]
            )
            msk_chunk = torch.cat(
                [torch.Tensor([1]), mask_chunks[j], torch.Tensor([1])]
            )
            pad_len = self.config.maxlen - inp_chunk.shape[0]
            if pad_len > 0:
                inp_chunk = torch.cat([inp_chunk, torch.Tensor([0] * pad_len)])
                msk_chunk = torch.cat([msk_chunk, torch.Tensor([0] * pad_len)])
            input_dict = {
                "input_ids": inp_chunk.long(),
                "attention_mask": msk_chunk.int(),
            }
            inputs.append(input_dict)

        for inp in inputs:
            mask = inp["attention_mask"].unsqueeze(0).to(self.device)
            input_id = inp["input_ids"].unsqueeze(0).to(self.device)
            logits = self.model(input_id, mask, None).logits
            predictions.append(logits.argmax(dim=2).tolist()[0])

        split_tokens = raw_text.split()
        output_entities = []
        for p in range(len(predictions)):
            output_entities.extend(predictions[p][1:-1])
        comp_idx = 0
        extension = 0
        word_ids = text_.word_ids()
        label_ids = []
        i = 0
        while i < len(word_ids):
            if word_ids[i] is not None:
                word = self.tokenizer.decode(text_.input_ids[i - extension : i + 1])
                if (word == split_tokens[comp_idx]) or (
                    "".join(word.split()) == split_tokens[comp_idx]
                ):
                    label_ids.append(self.config.id_tag[output_entities[i]])
                    comp_idx += 1
                    extension = 0
                elif word == "[UNK]":
                    label_ids.append(self.config.id_tag[output_entities[i]])
                    comp_idx += 1
                    extension = 0
                else:
                    extension += 1
            i += 1

        entities = {}
        for i in self.config.tag_id:
            entities[i.upper()] = []
        k = 0
        prev_label = None
        while k < len(label_ids):
            curr_label = label_ids[k]
            if curr_label != prev_label:
                entities[label_ids[k].upper()].append(split_tokens[k])
            else:
                entities[label_ids[k].upper()][-1] = (
                    entities[label_ids[k].upper()][-1] + " " + split_tokens[k]
                )
            prev_label = curr_label
            k += 1
        _ = entities.pop("EMPTY")
        return entities

    def named_entity_recognition(self, raw_text):
        pred = self.predict(raw_text)
        for i in pred:
            print(f"{i:{20}} - {pred[i]}")


## Usage ##

# if __name__ == "__main__":
#     named_entity_recognition = NER()
#     named_entity_recognition.named_entity_recognition('text for prediction')
