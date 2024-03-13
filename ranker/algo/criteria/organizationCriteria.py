import math


class OrganizationRankCriteria:
    """
    This class assigns the rank based on the organizations worked at
    """

    def __init__(self):
        """
        Initialized Variables:
        - self.org_avail: list of organizations available in the database
        """
        with open("algo/database/organizations.txt") as file:
            orgs = file.readlines()
            self.orgs_avail = []
            for org in orgs:
                self.orgs_avail.append(org[:-1].lower())

    def rank(self, companies):
        """
        Applies a decreasing mathematical function with organization rank as input variable
        :return: Normalized score
        """
        org_rank = []
        for company in companies:
            org_rank.append(self.orgs_avail.index(company.lower()))
        score = 0
        for ranks in org_rank:
            score += 1000 * math.exp(-(ranks) / 400)
        return 1.0 / (1 + math.exp(-score / 1000))


## Usage ##

# if __name__ == "__main__":
#     org_ranker = OrganizarionCriteria(companies=['Walmart', 'Wells Fargo', 'Netflix'])
#     print(org_ranker.rank())
#     org_ranker = OrganizationRankCriteria()
#     print(org_ranker.rank(companies=['Walmart', 'Wells Fargo', 'Netflix']))
