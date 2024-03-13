import fuzzyset
import pickle


def find_orgs():

    with open("../../database/organizations.txt") as file:

        orgs = file.readlines()
        orgs_avail = []

        for org in orgs:
            orgs_avail.append(org[:-1].lower())

    return orgs_avail


orgs_avail = find_orgs()

# declaring fuzzyset object and using it to get the full company names
fz = fuzzyset.FuzzySet()
for l in orgs_avail:
    fz.add(l)

# writing to .pth file using pickle
print("Writing to org.pth")
with open("org.pth", "wb") as fout:
    pickle.dump((fz, orgs_avail), fout)
    print("Done.")
