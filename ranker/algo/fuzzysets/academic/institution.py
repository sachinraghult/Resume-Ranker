import fuzzyset
import pickle
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


def find_ins():

    engineering = pd.read_csv("../../database/Engineering.csv")
    management = pd.read_csv("../../database/Management.csv")

    engg = engineering["Name"].unique()
    mgmt = management["Name"].unique()

    return engg, mgmt


engg, mgmt = find_ins()
engg, mgmt = [i.lower() for i in engg], [i.lower() for i in mgmt]

stop_words = set(stopwords.words("english"))

abbr_engg = []
for i in engg:
    stg = ""
    for word in i.split():
        if not word in stop_words:
            if word != "and":
                stg += str(word[0])
    abbr_engg.append(stg.lower())

abbr_mgmt = []
for i in mgmt:
    stg = ""
    for word in i.split():
        if not word in stop_words:
            if word != "and":
                stg += str(word[0])
    abbr_mgmt.append(stg.lower())

# declaring fuzzyset object and using it to get the full college names
fz1 = fuzzyset.FuzzySet()
for f in engg:
    fz1.add(f.lower())

fz2 = fuzzyset.FuzzySet()
for u in abbr_engg:
    fz2.add(u.lower())

fz3 = fuzzyset.FuzzySet()
for f in mgmt:
    fz3.add(f.lower())

fz4 = fuzzyset.FuzzySet()
for u in abbr_mgmt:
    fz4.add(u.lower())

# writing to .pth file using pickle
print("Writing to institute.pth")
with open("institute.pth", "wb") as fout:
    pickle.dump(
        (fz1, fz2, fz3, fz4, list(engg), list(mgmt), list(abbr_engg), list(abbr_mgmt)),
        fout,
    )
    print("Done.")
