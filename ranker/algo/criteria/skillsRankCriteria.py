from algo.criteria.word2vec import Word2VecDownloader
from algo.utils import stemmed_words

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SkillsRankCriteria(Word2VecDownloader):

    """This class assigns the rank based on skills"""

    def __init__(
        self,
    ):
        self.tf_idf_vect = TfidfVectorizer(analyzer=stemmed_words)

    def rank(self, applicant_skills, job_skills):

        r = []

        for i in job_skills:
            skill = i["skill"]
            weight = i["value"] / 100.0
            r.append(self.keyword_score(skill.lower(), applicant_skills) * weight)
        return sum(r)

    def keyword_score(self, jd_skill, cv_skill):

        score = []

        for x in cv_skill:
            s = 0

            try:
                s = Word2VecDownloader.model.similarity(
                    x.replace(" ", "").lower(), jd_skill.replace(" ", "").lower()
                )
                if s >= 1:
                    s = 1.0

            except KeyError:

                try:

                    tf_idf_resume_vector = self.tf_idf_vect.fit_transform([x]).todense()
                    tf_idf_desc_vector = self.tf_idf_vect.transform(
                        [jd_skill]
                    ).todense()
                    s = cosine_similarity(tf_idf_resume_vector, tf_idf_desc_vector)[0][
                        0
                    ]
                    if s >= 1:
                        s = 1.0

                except ValueError or KeyError:
                    pass
            score.append(s)

        if score:
            return max(score)
        return 0


## Usage ##

# if __name__ == "__main__":
#     skills_ranker = SkillsRankCriteria()
#     print(skills_ranker.rank(["machine learning", "nlp", "cv" , "computer design"],[{ "skill":"machine development", "value":0.75},{ "skill":"software development", "value":0.25}]))
