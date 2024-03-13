import torch
import torch.nn.functional as f

from transformers import BertTokenizer

from algo.duplicate_checker.bert_cosine.model import BertDuplicateChecker


class BertDuplicateResumeChecker:

    """
    This class uses a BERT model to check the similarity between two resume files and return a similarity score

    """

    def __init__(self):

        self.model = BertDuplicateChecker()
        self.model.eval()
        self.tokenizer = BertTokenizer.from_pretrained("bert-large-cased")

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def check_similarity(self, texts):

        """
        Parameters:

        - texts: list of sentences whose similarity we want to check via the model

        returns: embeddings of sentence tokens

        """

        encodings = self.tokenizer(texts, padding=True, return_tensors="pt").to(
            self.device
        )

        with torch.no_grad():
            embeddings = self.model(**encodings)

        return embeddings[0][:, 0, :]

    def calculate_similarity(self, texts):

        """
        Parameters:

        - texts: list of sentences whose similarity we want to check via the model

        returns: similarity score (mean cosine distance)

        """

        __CLS__ = self.check_similarity(texts=texts)

        __CLS__norm = f.normalize(__CLS__, p=2, dim=1)

        dist = __CLS__norm.matmul(__CLS__norm.T)
        dist = dist.new_ones(dist.shape) - dist

        return dist.numpy()


## Usage ##

# if __name__ == "__main__":
#     dup = BertDuplicateResumeChecker()
#     dup.calculate_similarity(
#         [
#             "<content/of/Resume1>",
#             "<content/of/Resume2>"
#         ]
#     )
