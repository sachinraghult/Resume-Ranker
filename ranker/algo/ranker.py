from algo.criteria import (
    JobSwitchRankCriteria,
    OrganizationRankCriteria,
    KeywordMatchingCriteria,
    SkillsRankCriteria,
    DomainRankCriteria,
    AcademicRankCriteria,
)
from algo.parser import ResumeParser


class Scorer:
    """
    This class calls all scoring functions and assigns the final score
    """

    def __init__(
        self,
        weights={
            "experience_score": 0.25,
            "skill_score": 0.25,
            "keyword_score": 0.15,
            "jobswitch_score": 0.1,
            "organization_score": 0.15,
            "institution_score": 0.1,
        },
    ):
        self.weights = weights
        self.jsc = JobSwitchRankCriteria()
        self.oc = OrganizationRankCriteria()
        self.kc = KeywordMatchingCriteria()
        self.sc = SkillsRankCriteria()
        self.dc = DomainRankCriteria()
        self.ac = AcademicRankCriteria()
        self.parser = ResumeParser()
        self.isCorrupted = False
        self.min_skill = 0
        self.min_key = 0
        self.min_exp = 0
        self.min_org = 0.075
        self.min_acad = 0.05
        self.min_job = 0.1

    def score(self, path, jd):
        entities = self.parser.extract(path, jd)
        organization_score = self.organizationScore(entities["company_names"])
        jobswitch_score = self.jobSwitchScore(entities["company_names"])
        academic_score = self.academicScore(
            entities["college_name"], entities["degree"]
        )
        skill_score = self.skillMatchScore(entities["skills"], jd["skills"])
        domain_score = self.domainScore(entities["text"], jd["exp"])
        keyword_score = self.keywordScore(entities["text"], entities["jd_key_words"])

        weighted_domain_score = domain_score * self.weights["experience_score"]
        weighted_org_score = organization_score * self.weights["organization_score"]
        weighted_jobswitch_score = jobswitch_score * self.weights["jobswitch_score"]
        weighted_academic_score = academic_score * self.weights["institution_score"]
        weighted_skill_score = skill_score * self.weights["skill_score"]
        weighted_keyword_score = keyword_score * self.weights["keyword_score"]

        if (
            (weighted_skill_score == self.min_skill)
            and (weighted_domain_score == self.min_exp)
            and (weighted_org_score == self.min_org)
            and (weighted_jobswitch_score == self.min_job)
            and (weighted_keyword_score == self.min_key)
            and (weighted_academic_score == self.min_acad)
        ):
            self.isCorrupted = True

        entities["isCorrupted"] = self.isCorrupted

        score = (
            weighted_org_score
            + weighted_jobswitch_score
            + weighted_academic_score
            + weighted_skill_score
            + weighted_domain_score
            + weighted_keyword_score
        )
        return (
            entities,
            score,
            weighted_org_score,
            weighted_jobswitch_score,
            weighted_academic_score,
            weighted_skill_score,
            weighted_domain_score,
            weighted_keyword_score,
        )

    def skillMatchScore(self, skills, jdskills):
        return self.sc.rank(skills, jdskills)

    def jobSwitchScore(self, companies):
        return self.jsc.rank(companies)

    def organizationScore(self, organizations):
        return self.oc.rank(organizations)

    def academicScore(self, institutes, degrees):
        return self.ac.rank(institutes, degree=degrees)

    def domainScore(self, experience, jd):
        return self.dc.rank(experience, jd)

    def keywordScore(self, cv, keywords):
        return self.kc.rank(cv, keywords)
