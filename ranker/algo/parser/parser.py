import os
import io
import spacy
import pickle
from algo.ner.spacyNer import spacyNER
from algo.parser import utils


class ResumeParser(object):
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.custom_nlp = spacyNER().model
        self.parsed_entities = {
            "skills": [],
            "college_name": [],
            "experience": [],
            "company_names": [],
            "total_experience": [],
            "jd_key_words": [],
            "degree": None,
            "text": None,
        }

        with open("weights/org.pth", "rb") as file:
            self.fuzzy_set, self.orgs_avail = pickle.load(file)

        with open("weights/keyword.pth", "rb") as f:
            self.tf, self.c = pickle.load(f)

        with open("weights/skills.pth", "rb") as file1:
            (
                self.skill_fuzzy_set,
                self.skill_abv_fuzzy_set,
                self.skills_avail,
                self.abv_skills_avail,
            ) = pickle.load(file1)

    def clear(self):
        self.parsed_entities = {
            "skills": [],
            "college_name": [],
            "experience": [],
            "company_names": [],
            "total_experience": [],
            "jd_key_words": [],
            "degree": [],
            "text": None,
        }

    def extract(self, resume, jd):
        self.resume = resume
        if not isinstance(self.resume, io.BytesIO):
            ext = os.path.splitext(self.resume)[1].split(".")[1]
        else:
            ext = self.resume.name.split(".")[1]
        self.raw_text = utils.extract_text(self.resume, "." + ext)
        self.text = " ".join(self.raw_text.split("\n"))
        self.__nlp = self.nlp(self.text)
        self.__custom_nlp = self.custom_nlp(self.text)
        self.__noun_chunks = list(self.__nlp.noun_chunks)
        self.get_basic_details(jd)
        return self.parsed_entities

    def get_basic_details(self, jd):
        self.clear()
        cust_ent = utils.extract_entities_wih_custom_model(self.__custom_nlp)
        skills = utils.extract_skills(
            self.__nlp,
            self.__noun_chunks,
            self.skill_fuzzy_set,
            self.skills_avail,
            self.skill_abv_fuzzy_set,
            self.abv_skills_avail,
        )
        entities = utils.extract_entity_sections_grad(self.raw_text)
        key_words = []
        if jd["keywords"]:
            for i in jd["keywords"]:
                key_words.append(i["keyword"])

        jd_text = (
            "Title :"
            + jd["title"]
            + "Desciption :"
            + jd["desc"]
            + "Experience :"
            + jd["exp"]
            + "Skills :"
        )
        for key in jd["skills"]:
            jd_text = jd_text + "  " + key["skill"]
        jd_text = jd_text + "Keywords :"
        for key in jd["keywords"]:
            jd_text = jd_text + "  " + key["keyword"]
        key_words.extend(utils.get_keywords(self.tf, self.c, jd_text))

        # extract skills
        self.parsed_entities["skills"] = skills

        # extract college name
        try:
            self.parsed_entities["college_name"] = cust_ent["College Name"]
        except KeyError:
            try:
                self.parsed_entities["college_name"] = entities["College Name"]
            except Exception:
                pass

        # extract education Degree
        try:
            self.parsed_entities["degree"] = utils.extract_education(
                [i.lower().strip() for i in cust_ent["Degree"]]
            )
        except KeyError:
            try:
                self.parsed_entities["degree"] = utils.extract_education(
                    [sent.text.strip() for sent in self.__nlp.sents]
                )
            except KeyError:
                pass
        # extract designation
        # try:
        #    self.parsed_entities["designation"] = cust_ent["Designation"]
        # except KeyError:
        #    pass

        try:
            self.parsed_entities["experience"] = entities["experience"]
            try:
                exp = round(utils.get_total_experience(entities["experience"]) / 12, 2)
                self.parsed_entities["total_experience"] = exp
            except KeyError:
                self.parsed_entities["total_experience"] = 0
        except KeyError:
            self.parsed_entities["total_experience"] = 0

        exp__ = " ".join(self.parsed_entities["experience"])
        __exp = self.nlp(exp__)
        __exp_noun_chunks = __exp.noun_chunks
        companies = utils.extract_organization(
            __exp, __exp_noun_chunks, self.fuzzy_set, self.orgs_avail
        )

        try:
            self.parsed_entities["company_names"] = companies
        except KeyError:
            pass

        self.parsed_entities["jd_key_words"] = key_words
        if bool(self.text.strip()):
            self.parsed_entities["text"] = self.text
        else:
            self.parsed_entities["text"] = None


# # Usage #

# if __name__ == "__main__":
#     text = ResumeParser(r"<path/to/resume/file>").get_extracted_data()
#     print(text)
