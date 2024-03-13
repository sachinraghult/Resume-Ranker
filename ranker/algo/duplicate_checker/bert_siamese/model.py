import torch
from sentence_transformers import SentenceTransformer


class SiameseEncoder(torch.nn.Module):

    """
    Class to define SentenceTransformers for sentence similarity
    """

    def __init__(self):

        super(SiameseEncoder, self).__init__()

        self.sent_transformer = SentenceTransformer("bert-base-nli-mean-tokens")

    def forward(self):

        return self.sent_transformer()

    def encode(self, text):

        return self.sent_transformer.encode(text)
