import unittest
from ranker.algo.criteria import OrganizationRankCriteria


class TestOrganizationRankingCriteria(unittest.TestCase):
    def test(self):

        org_ranker = OrganizationRankCriteria()

        score = org_ranker.rank(companies=["Wells Fargo"])
        score_type = type(score)

        self.assertTrue(score_type, "float")


if __name__ == "__main__":
    unittest.main()
