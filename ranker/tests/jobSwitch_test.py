import unittest
from ranker.algo.criteria import JobSwitchRankCriteria


class TestJobSwitchRankingCriteria(unittest.TestCase):
    def test(self):

        jsc_ranker = JobSwitchRankCriteria()

        score = jsc_ranker.rank(companies=["Wells Fargo"])
        score_type = type(score)

        self.assertTrue(score_type, "float")


if __name__ == "__main__":
    unittest.main()
