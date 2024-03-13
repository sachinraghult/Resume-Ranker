import spacy
from algo.ner.spacyNer.config import Config


class spacyNER:

    """
    Class for performing the final named entity recognition task on a resume

    """

    def __init__(self):

        self.config = Config()
        self.load_weights()

    def load_weights(self):

        weight_file = "SPACY3_NER"
        weight_path = "weights/{}/model-best"
        self.model = spacy.load(weight_path.format(weight_file))
        print("Weights Loaded Successfully!")

    def predict(self, raw_text):

        doc = self.model(" ".join(raw_text.split("\n")))
        entities = {}
        for i in self.config.tag_id:
            entities[i.upper()] = []

        for ent in doc.ents:
            entities[ent.label_.upper()].append(ent.text)
        _ = entities.pop("EMPTY")
        return entities

    def named_entity_recognition(self, raw_text):

        pred = self.predict(raw_text)

        for i in pred:
            print(f"{i:{20}} - {pred[i]}")


## Usage ##

# if __name__ == "__main__":
#     named_entity_recognition = spacyNER()
#     named_entity_recognition.named_entity_recognition('text for prediction')
