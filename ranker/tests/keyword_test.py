import unittest
from ranker.algo.criteria import KeywordMatchingCriteria


class TestKeywordMatchingCriteria(unittest.TestCase):
    def test(self):

        kwc_ranker = KeywordMatchingCriteria()

        score = kwc_ranker.rank("I am skilled in Python, Java and C", "[Java, Python]")
        score_type = type(score)

        self.assertTrue(score_type, "float")


if __name__ == "__main__":
    unittest.main()
