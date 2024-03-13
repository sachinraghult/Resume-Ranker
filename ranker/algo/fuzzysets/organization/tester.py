from orgs import find_orgs

import fuzzyset
import pickle
import math

fz = fuzzyset.FuzzySet()

with open("org.pth", "rb") as f:
    c, d = pickle.load(f)

org_rank = []

for company in ["wells gargo pvt", "microsoft india"]:
    org = c.get(company)
    print(org)
    org_rank.append(d.index(org[0][1]) + 1)

score = 0

for ranks in org_rank:
    score += 1000 * math.exp(-(ranks) / 400)

print("Rank: {}".format(org_rank))
print("Score: {}".format(1.0 / (1 + math.exp(-score / 1000))))
