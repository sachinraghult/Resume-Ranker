from transformers import BertForTokenClassification
import torch


class BertNamedEntityRecognition(torch.nn.Module):

    """
    Class to define BERT Model for NER

    """

    def __init__(self, config):

        """
        Parameters:

        - config: configuration to be passed to the BERT model

        """

        super(BertNamedEntityRecognition, self).__init__()

        self.bert = BertForTokenClassification.from_pretrained(
            "bert-base-cased", num_labels=len(config.tag_id)
        )

    def forward(self, ids, mask, labels):

        output = self.bert(ids, mask, labels=labels)
        return output


## Usage ##

# if __name__ == "__main __":
#     config = Config(maxlen=512, batch_size=1, pretrained=True, use_scheduler=True)
#     model = BertNamedEntityRecognition(config)
