from re import S
import fuzzyset
import pickle
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


def find_skills():

    skills = pd.read_csv("../../database/skills.csv")
    skill = []
    for col in skills.columns:
        skill.append(col)

    return skill


skill = find_skills()

stop_words = set(stopwords.words("english"))

abbre = []
for s in skill:
    stg = ""
    for word in s.split():
        if not word in stop_words:

            if word != "and":
                stg += str(word[0])
    abbre.append(stg.lower())


# declaring fuzzyset object and using it to get the full college names
fz1 = fuzzyset.FuzzySet()
for f in skill:
    fz1.add(f.lower())

fz2 = fuzzyset.FuzzySet()
for u in abbre:
    fz2.add(u.lower())

# writing to .pth file using pickle
print("Writing to skills.pth")
with open("skills.pth", "wb") as fout:
    pickle.dump((fz1, fz2, skill, abbre), fout)
    print("Done.")
