import io
import re
import pickle
from datetime import datetime
from dateutil import relativedelta

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

import docx2txt
import fitz
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFSyntaxError

from algo.parser import constants as cs


def extract_text_from_pdf(pdf_path):
    """
    Helper function to extract the plain text from .pdf files
    :param pdf_path: path to PDF file to be extracted (remote or local)
    :yield: string of extracted text
    """

    text = ""
    with fitz.open(pdf_path) as pdf:
        for page in pdf:
            text += page.get_text()

    yield text


def get_number_of_pages(file_name):
    try:
        if isinstance(file_name, io.BytesIO):
            # for remote pdf file
            count = 0
            for page in PDFPage.get_pages(
                file_name, caching=True, check_extractable=True
            ):
                count += 1
            return count
        else:
            # for local pdf file
            if file_name.endswith(".pdf"):
                count = 0
                with open(file_name, "rb") as fh:
                    for page in PDFPage.get_pages(
                        fh, caching=True, check_extractable=True
                    ):
                        count += 1
                return count
            else:
                return None
    except PDFSyntaxError:
        return None


def extract_text_from_docx(doc_path):
    """
    Helper function to extract plain text from .docx files
    :param doc_path: path to .docx file to be extracted
    :return: string of extracted text
    """
    try:
        temp = docx2txt.process(doc_path)
        text = [line.replace("\t", " ") for line in temp.split("\n") if line]
        return " ".join(text)
    except KeyError:
        return " "


def extract_text_from_txt(txt_path):
    """
    Helper function to extract plain text from .docx files
    :param doc_path: path to .docx file to be extracted
    :return: string of extracted text
    """
    with open(txt_path, "r") as file:
        text = file.read().replace("\n", "")
    return text


def extract_text(file_path, extension):
    """
    Wrapper function to detect the file extension and call text
    extraction function accordingly
    :param file_path: path of file of which text is to be extracted
    :param extension: extension of file `file_name`
    """
    text = ""
    if extension == ".pdf":
        for page in extract_text_from_pdf(file_path):
            text += " " + page
    elif extension == ".docx":
        text = extract_text_from_docx(file_path)
    elif extension == ".txt":
        text = extract_text_from_txt(file_path)
    return text


def extract_entity_sections_grad(text):
    """
    Helper function to extract all the raw text from sections of
    resume specifically for graduates and undergraduates
    :param text: Raw text of resume
    :return: dictionary of entities
    """
    text_split = [i.strip() for i in text.split("\n")]
    # sections_in_resume = [i for i in text_split if i.lower() in sections]
    entities = {}
    key = False
    for phrase in text_split:
        if len(phrase) == 1:
            p_key = phrase
        else:
            p_key = set(phrase.lower().split()) & set(cs.RESUME_SECTIONS_GRAD)
        try:
            p_key = list(p_key)[0]
        except IndexError:
            pass
        if p_key in cs.RESUME_SECTIONS_GRAD:
            entities[p_key] = []
            key = p_key
        elif key and phrase.strip():
            entities[key].append(phrase)
    return entities


def extract_entities_wih_custom_model(custom_nlp_text):
    """
    Helper function to extract different entities with custom
    trained model using SpaCy's NER
    :param custom_nlp_text: object of `spacy.tokens.doc.Doc`
    :return: dictionary of entities
    """
    entities = {}
    for ent in custom_nlp_text.ents:
        if ent.label_ not in entities.keys():
            entities[ent.label_] = [ent.text]
        else:
            entities[ent.label_].append(ent.text)
    for key in entities.keys():
        entities[key] = list(set(entities[key]))
    return entities


def get_total_experience(experience_list):
    """
    Wrapper function to extract total months of experience from a resume
    :param experience_list: list of experience text extracted
    :return: total months of experience
    """
    exp_ = []
    for line in experience_list:
        experience = re.search(
            r"(?P<fmonth>\w+.\d+)\s*(\D|to)\s*(?P<smonth>\w+.\d+|present)", line, re.I
        )
        if experience:
            exp_.append(experience.groups())
    total_exp = sum([get_number_of_months_from_dates(i[0], i[2]) for i in exp_])
    total_experience_in_months = total_exp
    return total_experience_in_months


def get_number_of_months_from_dates(date1, date2):
    """
    Helper function to extract total months of experience from a resume
    :param date1: Starting date
    :param date2: Ending date
    :return: months of experience from date1 to date2
    """
    if date2.lower() == "present":
        date2 = datetime.now().strftime("%b %Y")
    try:
        if len(date1.split()[0]) > 3:
            date1 = date1.split()
            date1 = date1[0][:3] + " " + date1[1]
        if len(date2.split()[0]) > 3:
            date2 = date2.split()
            date2 = date2[0][:3] + " " + date2[1]
    except IndexError:
        return 0
    try:
        date1 = datetime.strptime(str(date1), "%b %Y")
        date2 = datetime.strptime(str(date2), "%b %Y")
        months_of_experience = relativedelta.relativedelta(date2, date1)
        months_of_experience = (
            months_of_experience.years * 12 + months_of_experience.months
        )
    except ValueError:
        return 0
    return months_of_experience


def extract_entity_sections_professional(text):
    """
    Helper function to extract all the raw text from sections of
    resume specifically for professionals
    :param text: Raw text of resume
    :return: dictionary of entities
    """
    text_split = [i.strip() for i in text.split("\n")]
    entities = {}
    key = False
    for phrase in text_split:
        if len(phrase) == 1:
            p_key = phrase
        else:
            p_key = set(phrase.lower().split()) & set(cs.RESUME_SECTIONS_PROFESSIONAL)
        try:
            p_key = list(p_key)[0]
        except IndexError:
            pass
        if p_key in cs.RESUME_SECTIONS_PROFESSIONAL:
            entities[p_key] = []
            key = p_key
        elif key and phrase.strip():
            entities[key].append(phrase)
    return entities


def extract_email(text):
    """
    Helper function to extract email id from text
    :param text: plain text extracted from resume file
    """
    email = re.findall(r"([^@|\s]+@[^@]+\.[^@|\s]+)", text)
    if email:
        try:
            return email[0].split()[0].strip(";")
        except IndexError:
            return None


def extract_name(nlp_text, matcher):
    """
    Helper function to extract name from spacy nlp text
    :param nlp_text: object of `spacy.tokens.doc.Doc`
    :param matcher: object of `spacy.matcher.Matcher`
    :return: string of full name
    """
    pattern = [cs.NAME_PATTERN]

    matcher.add("NAME", pattern)

    matches = matcher(nlp_text)

    for _, start, end in matches:
        span = nlp_text[start:end]
        if "name" not in span.text.lower():
            return span.text


def extract_mobile_number(text, custom_regex=None):
    """
    Helper function to extract mobile number from text
    :param text: plain text extracted from resume file
    :return: string of extracted mobile numbers
    """
    if not custom_regex:
        mob_num_regex = r"""(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)
                        [-\.\s]*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})"""
        phone = re.findall(re.compile(mob_num_regex), text)
    else:
        phone = re.findall(re.compile(custom_regex), text)
    if phone:
        number = "".join(phone[0])
        return number


def extract_skills(nlp_text, noun_chunks, fuzzy_set, skills, abv_fuzzy_set, abv_skills):
    """
    Helper function to extract skills from spacy nlp text
    :param nlp_text: object of `spacy.tokens.doc.Doc`
    :param noun_chunks: noun chunks extracted from nlp text
    :return: list of skills extracted
    """
    tokens = [token.text for token in nlp_text if not token.is_stop]
    skillset = []
    # check for one-grams
    for token in tokens:
        skill = fuzzy_set.get(token.lower())
        abv_skill = abv_fuzzy_set.get(token.lower())
        if (skill is not None) and (abv_skill is not None):
            if (skill[0][0] > 0.8) and (skill[0][0] > abv_skill[0][0]):
                skillset.append(skill[0][1])

            elif abv_skill[0][0] > 0.8:
                skillset.append(abv_skill[0][1])

    # check for bi-grams and tri-grams
    for token in noun_chunks:
        token = token.text.lower().strip()
        skill = fuzzy_set.get(token)
        abv_skill = abv_fuzzy_set.get(token)
        if (skill is not None) and (abv_skill is not None):
            if (skill[0][0] > 0.8) and (skill[0][0] > abv_skill[0][0]):
                skillset.append(skill[0][1])

            elif abv_skill[0][0] > 0.8:
                skillset.append(abv_skill[0][1])

    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def extract_organization(nlp_text, noun_chunks, fuzzy_set, organizations):
    """
    Helper function to extract organizations from spacy nlp text
    :param nlp_text: object of `spacy.tokens.doc.Doc`
    :param noun_chunks: noun chunks extracted from nlp text
    :return: list of skills extracted
    """
    tokens = [token.text for token in nlp_text if not token.is_stop]
    orgset = []
    # check for one-grams
    for token in tokens:
        org = fuzzy_set.get(token.lower())
        if (org is not None) and (org[0][0] > 0.8):
            orgset.append(org[0][1])

    # check for bi-grams and tri-grams
    for token in noun_chunks:
        token = token.text.lower().strip()
        org = fuzzy_set.get(token)
        if (org is not None) and (org[0][0] > 0.8):
            orgset.append(org[0][1])
    return [i.capitalize() for i in set([i.lower() for i in orgset])]


def cleanup(token, lower=True):
    if lower:
        token = token.lower()
    return token.strip()


def extract_education(nlp_text):
    """
    Helper function to extract education from spacy nlp text
    :param nlp_text: object of `spacy.tokens.doc.Doc`
    :return: tuple of education degree and year if year if found
             else only returns education degree
    """

    degree = []
    # Extract education degree
    try:
        for index, text in enumerate(nlp_text):
            for tex in text.split():
                tex = re.sub(r"[?|$|.|!|,]", r"", tex)
                if tex.upper() in cs.EDUCATION_E and tex not in cs.STOPWORDS:
                    if "ENGINEERING" not in degree:
                        degree.append("ENGINEERING")
                if tex.upper() in cs.EDUCATION_M and tex not in cs.STOPWORDS:
                    if "MANAGEMENT" not in degree:
                        degree.append("MANAGEMENT")

    except IndexError:
        pass
    return degree


def extract_experience(resume_text):
    """
    Helper function to extract experience from resume text
    :param resume_text: Plain resume text
    :return: list of experience
    """
    wordnet_lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words("english"))

    # word tokenization
    word_tokens = nltk.word_tokenize(resume_text)

    # remove stop words and lemmatize
    filtered_sentence = [
        w
        for w in word_tokens
        if w not in stop_words and wordnet_lemmatizer.lemmatize(w) not in stop_words
    ]
    sent = nltk.pos_tag(filtered_sentence)

    # parse regex
    cp = nltk.RegexpParser("P: {<NNP>+}")
    cs = cp.parse(sent)

    # for i in cs.subtrees(filter=lambda x: x.label() == 'P'):
    #     print(i)

    test = []

    for vp in list(cs.subtrees(filter=lambda x: x.label() == "P")):
        test.append(" ".join([i[0] for i in vp.leaves() if len(vp.leaves()) >= 2]))

    # Search the word 'experience' in the chunk and
    # then print out the text after it
    x = [
        x[x.lower().index("experience") + 10 :]
        for i, x in enumerate(test)
        if x and "experience" in x.lower()
    ]
    return x


# function required to convert a string array denoting time to an integer result
def convert(exp):
    result = ""
    for x in range(0, len(exp)):
        result += exp[x]
    return int(result)


# calculates the number of days between 2 datetime objects to determine days of EXPERIENCE
def calc(s):
    for i in range(0, len(s)):

        # code to correct an abnormal behavior in extracting date from the dateutil library
        if s[i].day < 13:
            s[i].month, s[i].day = s[i].day, s[i].month

    if len(s) == 1:
        now = datetime.now()
        now = now - s[0]
        return int(now.days)

    else:
        diff = s[1] - s[0]
        return int(diff.days)


def sort_coo(coo_matrix):

    """
    function to get the sorted tf-idf vectors by descending order of scores

    """
    tuples = zip(coo_matrix.col, coo_matrix.data)
    return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)


def extract_topn_from_vector(feature_names, sorted_items, topn=10):

    """
    function to get the feature names and tf-idf score of top n items

    """

    sorted_items = sorted_items[:topn]

    score_vals = []
    feature_vals = []

    for idx, score in sorted_items:
        fname = feature_names[idx]

        score_vals.append(round(score, 3))
        feature_vals.append(feature_names[idx])

    results = {}
    for idx in range(len(feature_vals)):
        results[feature_vals[idx]] = score_vals[idx]

    return results


def get_keywords(tf, c, doc):

    """
    function to extract keywords from job description

    """
    feature_names = c.get_feature_names()

    tf_idf_vector = tf.transform(c.transform([doc]))

    sorted_items = sort_coo(tf_idf_vector.tocoo())

    keywords = extract_topn_from_vector(feature_names, sorted_items)
    k = []
    for key in keywords.keys():
        k.append(key)
    return k
