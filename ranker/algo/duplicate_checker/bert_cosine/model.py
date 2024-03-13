import torch
from transformers import BertModel


class BertDuplicateChecker(torch.nn.Module):

    """
    Class to define BERT model for sentence similarity

    """

    def __init__(self):

        super(BertDuplicateChecker, self).__init__()

        self.bert = BertModel.from_pretrained("bert-large-cased")

    def forward(
        self,
        input_ids,
        attention_mask=None,
        token_type_ids=None,
        position_ids=None,
        head_mask=None,
        labels=None,
    ):

        return self.bert(input_ids, attention_mask, labels)


## Usage ##

# if __name__ == "__main__":
#     model = BertDuplicateChecker()
