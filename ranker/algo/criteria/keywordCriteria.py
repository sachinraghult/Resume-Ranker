from algo.criteria.word2vec import Word2VecDownloader
from algo.utils import stemmed_words

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class KeywordMatchingCriteria(Word2VecDownloader):
    def __init__(
        self,
    ):
        self.tf_idf_vect = TfidfVectorizer(analyzer=stemmed_words)

    def rank(self, cv, keywords):

        """
        Applies a simple average get the mean keyword match score using word2vec

        :return: Normalized Score
        """

        if not cv:
            return 0

        if not keywords:
            return 0

        score = 0

        for key in keywords:
            score += self.keyword_score(cv, key)

        score = score / len(keywords)
        return score

    def keyword_score(self, cv, keyword):

        score = []
        txt = cv.lower().split()

        for x in txt:

            s = 0

            try:
                s = Word2VecDownloader.model.similarity(
                    keyword.replace(" ", ""), x.replace(" ", "")
                )
                if s >= 1:
                    s = 1.0

            except KeyError:

                try:

                    tf_idf_resume_vector = self.tf_idf_vect.fit_transform([x]).todense()
                    tf_idf_desc_vector = self.tf_idf_vect.transform([keyword]).todense()
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
#     keyword_ranker = KeywordMatchingCriteria()
#     keyword_ranker.rank("<text/extracted/from/resume>", "[keywords]")
