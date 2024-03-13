import unittest

from algo.criteria import (
    AcademicRankCriteria,
    DomainRankCriteria,
    JobSwitchRankCriteria,
    KeywordMatchingCriteria,
    OrganizationRankCriteria,
    SkillsRankCriteria,
)
from algo.duplicate_checker.bert_siamese import SiameseDuplicateResumeChecker
from algo.duplicate_checker.bert_cosine import BertDuplicateResumeChecker
from algo import Scorer

import warnings
import os


warnings.filterwarnings("ignore")
warnings.warn("DelftStack")
warnings.warn("Do not show this message")


jobdescription = {
    "title": "SDE",
    "desc": "Individual Contributor Role focused on developing RIA application using ML",
    "exp": "Bachelor's degree in Engineering. \nGood spoken and written English skills to effectively communicate technical concepts. \nStrong logical, analytical skills and a systematic problem solving approach. \nGood understanding of Software Development Life Cycle (SDLC).\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\nAbility to research and report on a variety of issues using problem solving skills.\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
    "skills": [
        {"skill": "Python", "value": 75},
        {"skill": "machine-learning", "value": 25},
    ],
    "keywords": [{"keyword": "Python"}, {"keyword": "ML"}],
    "tags": "Internship",
}


scorer = Scorer()

resume_path_pdf = "examples/test/srijarko.pdf"
(
    entities_pdf,
    score_pdf,
    orgScore_pdf,
    JscScore_pdf,
    aScore_pdf,
    sScore_pdf,
    dScore_pdf,
    kScore_pdf,
) = scorer.score(resume_path_pdf, jobdescription)

resume_path_txt = "examples/test/adarsh.txt"
(
    entities_txt,
    score_txt,
    orgScore_txt,
    JscScore_txt,
    aScore_txt,
    sScore_txt,
    dScore_txt,
    kScore_txt,
) = scorer.score(resume_path_txt, jobdescription)

resume_path_docx = "examples/test/adarsh.docx"
(
    entities_docx,
    score_docx,
    orgScore_docx,
    JscScore_docx,
    aScore_docx,
    sScore_docx,
    dScore_docx,
    kScore_docx,
) = scorer.score(resume_path_docx, jobdescription)


# parser = ResumeParser()
# extracted_entities = parser.extract("examples/resumes/srijarko.pdf", jobdescription)


class UnitTest(unittest.TestCase):
    def testDownloadScript(self):

        institute = os.path.exists("weights/institute.pth")
        keyword = os.path.exists("weights/keyword.pth")
        ner = os.path.exists("weights/SPACY3_NER.zip")
        org = os.path.exists("weights/org.pth")
        skill = os.path.exists("weights/skills.pth")
        word2vec = os.path.exists("weights/word2vec.bin")

        self.assertTrue(institute and keyword and ner and org and skill and word2vec)

    def testExtractionPDF(self):

        num_entities_pdf = len(entities_pdf)
        keys_pdf = entities_pdf.keys()

        self.assertEqual(num_entities_pdf, 8) and self.assertEqual(
            keys_pdf,
            [
                "skills",
                "college_name",
                "experience",
                "company_names",
                "total_experience",
                "key_words",
                "degree",
                "text",
            ],
        ) and self.assertTrue(type(entities_pdf["text"]), "String")

    def testExtractionTXT(self):

        num_entities_txt = len(entities_txt)
        keys_txt = entities_txt.keys()

        self.assertEqual(num_entities_txt, 8) and self.assertEqual(
            keys_txt,
            [
                "skills",
                "college_name",
                "experience",
                "company_names",
                "total_experience",
                "key_words",
                "degree",
                "text",
            ],
        ) and self.assertTrue(type(entities_txt["text"]), "String")

    def testExtractionDOCX(self):

        num_entities_docx = len(entities_docx)
        keys_docx = entities_docx.keys()

        self.assertEqual(num_entities_docx, 8) and self.assertEqual(
            keys_docx,
            [
                "skills",
                "college_name",
                "experience",
                "company_names",
                "total_experience",
                "key_words",
                "degree",
                "text",
            ],
        ) and self.assertTrue(type(entities_pdf["text"]), "String")

    def testSKillsExtract(self):

        skills_pdf = entities_pdf["skills"]
        skills_txt = entities_txt["skills"]
        skills_docx = entities_docx["skills"]

        skills_pdf_type = type(skills_pdf)
        skills_txt_type = type(skills_txt)
        skills_docx_type = type(skills_docx)

        self.assertTrue(skills_pdf_type, "list") and self.assertGreater(
            len(skills_pdf), 0
        ) and self.assertTrue(skills_txt_type, "list") and self.assertGreater(
            len(skills_txt), 0
        ) and self.assertTrue(
            skills_docx_type, "list"
        ) and self.assertGreater(
            len(skills_docx), 0
        )

    def testDegreeExtract(self):

        degree_pdf = entities_pdf["degree"]
        degree_txt = entities_txt["degree"]
        degree_docx = entities_docx["degree"]

        degree_pdf_type = type(degree_pdf)
        degree_txt_type = type(degree_txt)
        degree_docx_type = type(degree_docx)

        self.assertTrue(degree_pdf_type, "String") and (
            self.assertEqual(degree_pdf, "ENGINEERING")
        ) and self.assertTrue(degree_txt_type, "String") and (
            self.assertEqual(degree_txt, "ENGINEERING")
        ) and self.assertTrue(
            degree_docx_type, "String"
        ) and (
            self.assertEqual(degree_docx, "ENGINEERING")
        )

    def testCollegeExtraction(self):

        colleges_pdf = entities_pdf["college_name"]
        colleges_txt = entities_txt["college_name"]
        colleges_docx = entities_docx["college_name"]

        colleges_pdf_type = type(colleges_pdf)
        colleges_txt_type = type(colleges_txt)
        colleges_docx_type = type(colleges_docx)

        self.assertTrue(colleges_pdf_type, "list") and self.assertGreater(
            len(colleges_pdf), 0
        ) and self.assertTrue(colleges_txt_type, "list") and self.assertGreater(
            len(colleges_txt), 0
        ) and self.assertTrue(
            colleges_docx_type, "list"
        ) and self.assertGreater(
            len(colleges_docx), 0
        )

    def testOrgExtract(self):

        orgs_pdf = entities_pdf["company_names"]
        orgs_txt = entities_txt["company_names"]
        orgs_docx = entities_docx["company_names"]

        orgs_pdf_type = type(orgs_pdf)
        orgs_txt_type = type(orgs_pdf)
        orgs_docx_type = type(orgs_pdf)

        self.assertTrue(orgs_pdf_type, "list") and self.assertGreaterEqual(
            len(orgs_pdf), 0
        ) and self.assertTrue(orgs_txt_type, "list") and self.assertGreaterEqual(
            len(orgs_txt), 0
        ) and self.assertTrue(
            orgs_docx_type, "list"
        ) and self.assertGreaterEqual(
            len(orgs_docx), 0
        )

    def testExperienceExtract(self):

        experience_pdf = entities_pdf["experience"]
        experience_txt = entities_txt["experience"]
        experience_docx = entities_docx["experience"]

        total_experience_pdf = entities_pdf["total_experience"]
        total_experience_txt = entities_txt["total_experience"]
        total_experience_docx = entities_docx["total_experience"]

        experience_pdf_type = type(experience_pdf)
        experience_txt_type = type(experience_txt)
        experience_docx_type = type(experience_docx)

        total_experience_pdf_type = type(total_experience_pdf)
        total_experience_txt_type = type(total_experience_txt)
        total_experience_docx_type = type(total_experience_docx)

        (
            self.assertTrue(experience_pdf_type, "list")
            and self.assertTrue(total_experience_pdf_type, "float")
            and self.assertGreaterEqual(len(experience_pdf), 0)
            and self.assertGreaterEqual(total_experience_pdf, 0.0)
        ) and (
            self.assertTrue(experience_txt_type, "list")
            and self.assertTrue(total_experience_txt_type, "float")
            and self.assertGreaterEqual(len(experience_txt), 0)
            and self.assertGreaterEqual(total_experience_txt, 0.0)
        ) and (
            self.assertTrue(experience_docx_type, "list")
            and self.assertTrue(total_experience_docx_type, "float")
            and self.assertGreaterEqual(len(experience_docx), 0)
            and self.assertGreaterEqual(total_experience_docx, 0.0)
        )

    def testKeywordExtract(self):

        keywords_pdf = entities_pdf["jd_key_words"]
        keywords_txt = entities_txt["jd_key_words"]
        keywords_docx = entities_docx["jd_key_words"]

        keywords_pdf_type = type(keywords_pdf)
        keywords_txt_type = type(keywords_txt)
        keywords_docx_type = type(keywords_docx)

        self.assertTrue(keywords_pdf_type, "list") and self.assertGreater(
            len(keywords_pdf), 0
        ) and self.assertTrue(keywords_txt_type, "list") and self.assertGreater(
            len(keywords_txt), 0
        ) and self.assertTrue(
            keywords_docx_type, "list"
        ) and self.assertGreater(
            len(keywords_docx), 0
        )

    def testScore(self):

        self.assertGreaterEqual(score_pdf, 0) and self.assertLessEqual(
            score_pdf, 1
        ) and self.assertGreaterEqual(score_txt, 0) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testDomainCriteria(self):

        dc_ranker = DomainRankCriteria()

        score_pdf = dc_ranker.rank([entities_pdf["text"]], jobdescription["exp"])
        score_txt = dc_ranker.rank([entities_txt["text"]], jobdescription["exp"])
        score_docx = dc_ranker.rank([entities_docx["text"]], jobdescription["exp"])

        score_pdf_type = type(score_pdf)
        score_txt_type = type(score_txt)
        score_docx_type = type(score_docx)

        self.assertTrue(score_pdf_type, "float") and self.assertGreaterEqual(
            score_pdf, 0
        ) and self.assertLessEqual(score_pdf, 1) and self.assertTrue(
            score_txt_type, "float"
        ) and self.assertGreaterEqual(
            score_txt, 0
        ) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertTrue(
            score_docx_type, "float"
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testJobSwitchCriteria(self):

        jsc_ranker = JobSwitchRankCriteria()

        score_pdf = jsc_ranker.rank(entities_pdf["company_names"])
        score_txt = jsc_ranker.rank(entities_txt["company_names"])
        score_docx = jsc_ranker.rank(entities_docx["company_names"])

        score_pdf_type = type(score_pdf)
        score_txt_type = type(score_txt)
        score_docx_type = type(score_docx)

        self.assertTrue(score_pdf_type, "float") and self.assertGreaterEqual(
            score_pdf, 0
        ) and self.assertLessEqual(score_pdf, 1) and self.assertTrue(
            score_txt_type, "float"
        ) and self.assertGreaterEqual(
            score_txt, 0
        ) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertTrue(
            score_docx_type, "float"
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testKeywordCriteria(self):

        kwc_ranker = KeywordMatchingCriteria()

        score_pdf = kwc_ranker.rank(entities_pdf["text"], entities_pdf["jd_key_words"])
        score_txt = kwc_ranker.rank(entities_txt["text"], entities_txt["jd_key_words"])
        score_docx = kwc_ranker.rank(
            entities_docx["text"], entities_docx["jd_key_words"]
        )

        score_pdf_type = type(score_pdf)
        score_txt_type = type(score_txt)
        score_docx_type = type(score_docx)

        self.assertTrue(score_pdf_type, "float") and self.assertGreaterEqual(
            score_pdf, 0
        ) and self.assertLessEqual(score_pdf, 1) and self.assertTrue(
            score_txt_type, "float"
        ) and self.assertGreaterEqual(
            score_txt, 0
        ) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertTrue(
            score_docx_type, "float"
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testOrganizationCriteria(self):

        org_ranker = OrganizationRankCriteria()

        score_pdf = org_ranker.rank(entities_pdf["company_names"])
        score_txt = org_ranker.rank(entities_txt["company_names"])
        score_docx = org_ranker.rank(entities_docx["company_names"])

        score_pdf_type = type(score_pdf)
        score_txt_type = type(score_txt)
        score_docx_type = type(score_docx)

        self.assertTrue(score_pdf_type, "float") and self.assertGreaterEqual(
            score_pdf, 0
        ) and self.assertLessEqual(score_pdf, 1) and self.assertTrue(
            score_txt_type, "float"
        ) and self.assertGreaterEqual(
            score_txt, 0
        ) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertTrue(
            score_docx_type, "float"
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testSkillsRankCriteria(self):

        src_ranker = SkillsRankCriteria()

        score_pdf = src_ranker.rank(entities_pdf["skills"], jobdescription["skills"])
        score_txt = src_ranker.rank(entities_txt["skills"], jobdescription["skills"])
        score_docx = src_ranker.rank(entities_docx["skills"], jobdescription["skills"])

        score_pdf_type = type(score_pdf)
        score_txt_type = type(score_txt)
        score_docx_type = type(score_docx)

        self.assertTrue(score_pdf_type, "float") and self.assertGreaterEqual(
            score_pdf, 0
        ) and self.assertLessEqual(score_pdf, 1) and self.assertTrue(
            score_txt_type, "float"
        ) and self.assertGreaterEqual(
            score_txt, 0
        ) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertTrue(
            score_docx_type, "float"
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testAcademicRankCriteria(self):

        arc_ranker = AcademicRankCriteria()

        score_pdf = arc_ranker.rank(
            entities_pdf["college_name"], entities_pdf["degree"]
        )
        score_txt = arc_ranker.rank(
            entities_txt["college_name"], entities_txt["degree"]
        )
        score_docx = arc_ranker.rank(
            entities_docx["college_name"], entities_docx["degree"]
        )

        score_pdf_type = type(score_pdf)
        score_txt_type = type(score_txt)
        score_docx_type = type(score_docx)

        self.assertTrue(score_pdf_type, "float") and self.assertGreaterEqual(
            score_pdf, 0
        ) and self.assertLessEqual(score_pdf, 1) and self.assertTrue(
            score_txt_type, "float"
        ) and self.assertGreaterEqual(
            score_txt, 0
        ) and self.assertLessEqual(
            score_txt, 1
        ) and self.assertTrue(
            score_docx_type, "float"
        ) and self.assertGreaterEqual(
            score_docx, 0
        ) and self.assertLessEqual(
            score_docx, 1
        )

    def testSiameseDuplicateChecker(self):

        dup = SiameseDuplicateResumeChecker()
        similarity = dup.calculate_similarity(
            ["I am skilled in Python, Java and C", "skilled in Python, Java and C"]
        )

        similarity_type = type(similarity)

        self.assertTrue(similarity_type, "float")

    def testSiameseContext(self):

        dup = SiameseDuplicateResumeChecker()
        similarity = dup.calculate_similarity(
            [
                "I am skilled in Python, Java and C",
                "My expertise is in Java, C and Python",
            ]
        )

        self.assertGreater(similarity, 0.8)

    def testCosineDuplicateResumeChecker(self):

        dup = BertDuplicateResumeChecker()
        similarity = dup.calculate_similarity(
            ["I am skilled in Python, Java and C", "skilled in Python, Java and C"]
        )

        similarity_type = type(similarity)

        self.assertTrue(similarity_type, "float")


if __name__ == "__main__":
    unittest.main()
