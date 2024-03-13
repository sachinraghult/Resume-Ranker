import unittest
from ranker.algo.duplicate_checker.bert_siamese import SiameseDuplicateResumeChecker


class TestSiameseDuplicateResumeChecker(unittest.TestCase):
    def test(self):
        dup = SiameseDuplicateResumeChecker()
        similarity = dup.calculate_similarity(
            ["I am skilled in Python, Java and C", "skilled in Python, Java and C"]
        )

        similarity_type = type(similarity)

        self.assertTrue(similarity_type, "float")


if __name__ == "__main__":
    unittest.main()
