from skills import find_skills

import fuzzyset
import pickle
import math

fz = fuzzyset.FuzzySet()

with open("skills.pth", "rb") as f:
    f1, f2, s, a = pickle.load(f)

skills = []

for company in ["computer science", "data analysis", "AI"]:
    skill = f1.get(company.lower())
    abv_skill = f2.get(company.lower())
    if (skill is not None) and (abv_skill is not None):
        if (skill[0][0] > 0.8) and (skill[0][0] > abv_skill[0][0]):
            skills.append(skill[0][1])

        elif abv_skill[0][0] > 0.8:
            skills.append(abv_skill[0][1])
print(skills)
