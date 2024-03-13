import unittest
from ranker.algo.criteria import DomainRankCriteria


class TestDomainRankingCriteria(unittest.TestCase):
    def test(self):

        dc_ranker = DomainRankCriteria()

        exp_entity = [
            "Software Developer, iSchoolConnect",
            "Worked on NLP Models for Emotion Recognition and response generation to aid the Sales team.",
            "AI Mentor, Shashwat Foundation (Intel AI for Youth)",
            "Worked on teaching and guiding students through their projects, building pipelines and teaching various Machine Learning concepts.",
            "Machine Learning Developer, Frontier Holdings Above and Beyond Pvt. Ltd.",
            "Worked on development of state-of-the-art Face Recognition model using OpenFace, VGGFace, FaceNet and DeepFace.",
            "Software Engineer Intern, Wells Fargo",
        ]
        job_desc = "Bachelor's degree in Engineering. \nGood spoken and written English skills to effectively communicate technical concepts. \nStrong logical, analytical skills and a systematic problem solving approach. \nGood understanding of Software Development Life Cycle (SDLC).\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\nAbility to research and report on a variety of issues using problem solving skills.\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment"

        score = dc_ranker.rank([job_desc], exp_entity)
        score_type = type(score)

        self.assertTrue(score_type, "float")


if __name__ == "__main__":
    unittest.main()
