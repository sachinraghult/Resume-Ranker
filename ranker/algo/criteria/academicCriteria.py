import math
import pickle


class AcademicRankCriteria:

    """
    This class assigns the rank based on the Instituitions

    """

    def __init__(self):

        """
        Initialized Variables:

        - self.engineering_inst_avail,self.management_inst_avail,self.engineering_abbre_avail,self.management_abbre_avail: list of institutes available in the database
        - self.engineering_set,self.engineering_abbre_set,self.management_set,self.management_abbre_set: fuzzy set of organization names

        """
        with open("weights/institute.pth", "rb") as f:
            (
                self.engineering_set,
                self.engineering_abbre_set,
                self.management_set,
                self.management_abbre_set,
                self.engineering_inst_avail,
                self.management_inst_avail,
                self.engineering_abbre_avail,
                self.management_abbre_avail,
            ) = pickle.load(f)

    def rank(self, colleges, degree):

        """
        Applies a decreasing mathematical function with organization rank as input variable

        :return: Normalized score
        """

        acad_rank = []
        for d in degree:
            if d == "ENGINEERING":
                for college in colleges:
                    ans1 = self.engineering_set.get(college)
                    ans2 = self.engineering_abbre_set.get(college)
                    if (ans1[0][0] > 0.75) and (ans1[0][0] >= ans2[0][0]):
                        acad_rank.append(self.engineering_inst_avail.index(ans1[0][1]))
                    elif ans2[0][0] > 0.75:
                        acad_rank.append(self.engineering_abbre_avail.index(ans2[0][1]))
            elif d == "MANAGEMENT":
                for college in colleges:
                    ans1 = self.management_set.get(college)
                    ans2 = self.management_abbre_set.get(college)
                    if (ans1[0][0] > 0.75) and (ans1[0][0] >= ans2[0][0]):
                        acad_rank.append(self.management_inst_avail.index(ans1[0][1]))
                    elif ans2[0][0] > 0.75:
                        acad_rank.append(self.management_abbre_avail.index(ans2[0][1]))

        score = 0

        for ranks in acad_rank:
            score += 1000 * math.exp(-(ranks) / 400)

        return 1.0 / (1 + math.exp(-score / 1000))


## Usage ##

# if __name__ == "__main__":
#     academic_ranker = AcademicRankCriteria()
#     print(academic_ranker.rank(colleges=['dtu','nsut','SRM Institute']))
