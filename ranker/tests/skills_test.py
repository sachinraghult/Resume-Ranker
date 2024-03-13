import unittest
from ranker.algo.criteria import SkillsRankCriteria


class TestSkillMatchCriteria(unittest.TestCase):
    def test(self):

        src_ranker = SkillsRankCriteria()

        score = src_ranker.rank(
            "machine learning, nlp, cv , computer design",
            "machine development, software development",
        )
        score_type = type(score)

        self.assertTrue(score_type, "float")


if __name__ == "__main__":
    unittest.main()
