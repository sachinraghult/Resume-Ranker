import unittest
from ranker.algo.criteria import AcademicRankCriteria


class TestAcademicRankingCriteria(unittest.TestCase):
    def test(self):

        inst_ranker = AcademicRankCriteria()

        score = inst_ranker.rank(colleges=["nsut", "dtu"], degree="ENGINEERING")
        score_type = type(score)

        self.assertTrue(score_type, "float")


if __name__ == "__main__":
    unittest.main()
