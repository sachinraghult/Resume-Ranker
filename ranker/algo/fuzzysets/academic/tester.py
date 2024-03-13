from institution import find_ins

import fuzzyset
import pickle
import math

fz = fuzzyset.FuzzySet()

with open("institute.pth", "rb") as f:
    (
        engineering_set,
        engineering_abbre_set,
        management_set,
        management_abbre_set,
        engineering_inst_avail,
        management_inst_avail,
        engineering_abbre_avail,
        management_abbre_avail,
    ) = pickle.load(f)

# print(engineering_inst_avail, "\n")
# print(engineering_abbre_avail, "\n")
# print(engineering_set, "\n")
# print(engineering_abbre_set, "\n")
# print(management_inst_avail, "\n")
# print(management_abbre_avail, "\n")
# print(management_set, "\n")
# print(management_abbre_set)

acad_rank = []
colleges = [
    "Indian Institute of Technology Madras",
    "Indian Institute of Management, Calcutta",
]
degrees = ["ENGINEERING", "MANAGEMENT"]

try:

    for degree, college in zip(degrees, colleges):

        if degree == "ENGINEERING":

            # for college in colleges:

            print(college, degree)

            ans1 = engineering_set.get(college)
            ans2 = engineering_abbre_set.get(college)

            if ans1[0][0] >= ans2[0][0]:
                acad_rank.append(engineering_inst_avail.index(ans1[0][1]) + 1)
            else:
                acad_rank.append(engineering_abbre_avail.index(ans2[0][1]) + 1)

        elif degree == "MANAGEMENT":

            # for college in colleges:

            print(college, degree)

            ans1 = management_set.get(college)
            ans2 = management_abbre_set.get(college)

            if ans1[0][0] >= ans2[0][0]:
                acad_rank.append(management_inst_avail.index(ans1[0][1]) + 1)
            else:
                acad_rank.append(management_abbre_avail.index(ans2[0][1]) + 1)


except ValueError:
    pass

score = 0

for ranks in acad_rank:
    score += 1000 * math.exp(-(ranks) / 400)

print("Rank: {}".format(acad_rank))
print("Score: {}".format(1.0 / (1 + math.exp(-score / 1000))))
