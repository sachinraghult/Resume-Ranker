import torch
import scipy

from algo.duplicate_checker.bert_siamese.model import SiameseEncoder


class DomainRankCriteria:
    """This class assigns the rank based on domain experience"""

    def __init__(
        self,
    ):
        self.model = SiameseEncoder()
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def rank(self, applicant_experience, job_description):
        if not applicant_experience:
            return 0
        else:
            applicant_experience = [applicant_experience]

        jd_embeddings = self.model.encode(job_description)
        app_embeddings = [self.model.encode(i) for i in applicant_experience]
        scores = scipy.spatial.distance.cdist([jd_embeddings], app_embeddings, "cosine")

        return scores.mean()


## Usage ##

# if __name__ == "__main__":
#     domain_ranker = DomainRankCriteria()
#     print(domain_ranker.rank("<job_description>", "<applicant_experience>"))
