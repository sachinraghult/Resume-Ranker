import torch
import scipy

from algo.duplicate_checker.bert_siamese.model import SiameseEncoder


class SiameseDuplicateResumeChecker:
    def __init__(self):

        self.model = SiameseEncoder()
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def check_similarity(self, texts):

        """
        Parameters:

        - texts: list of sentences whose similarity we want to check via the model

        - threshold: threshold level to compare the similarity of the new resume data

        returns: embeddings of sentence tokens

        """

        # Using the bert-siamese model to compute the embedding of all the old resumes data and the new resume data passed

        old_data, new_data = texts[0], texts[1]

        old_data_embedding = self.model.encode(old_data)
        new_data_embedding = self.model.encode(new_data)

        return old_data_embedding, new_data_embedding

    def calculate_similarity(self, texts):

        """
        Parameters:

        - texts: list of sentences whose similarity we want to check via the model

        returns: similarity score (mean cosine distance)

        """

        # Calculating the cosine distance of with all resumes in the database and sorting it in the descending order w.r.t the cosine score

        old_data_embedding, new_data_embedding = self.check_similarity(texts=texts)

        distances = scipy.spatial.distance.cdist(
            [new_data_embedding], [old_data_embedding], "cosine"
        )[0]

        result_pair = zip(range(len(distances)), distances)
        result_pair = sorted(result_pair, key=lambda x: x[1])
        final_pair = result_pair[0:1][0]

        return 1 - final_pair[1]


## Usage ##

# if __name__ == "__main__":
#     dup = SiameseDuplicateResumeChecker()
#     dup.calculate_similarity(
#         [
#             "<content/of/Resume1>",
#             "<content/of/Resume2>"
#         ]
#     )
