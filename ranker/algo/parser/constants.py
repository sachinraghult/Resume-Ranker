from nltk.corpus import stopwords

NAME_PATTERN = [{"POS": "PROPN"}, {"POS": "PROPN"}]

# Education (Upper Case Mandatory)
EDUCATION_E = [
    "BE",
    "B.E.",
    "B.E",
    "BS",
    "B.S",
    "ME",
    "M.E",
    "M.E.",
    "MS",
    "M.S",
    "B.TECH",
    "BTECH",
    "TECHNOLOGY",
    "MTECH",
]
EDUCATION_M = [
    "COMMERCE",
    "BUSINESS",
    "ADMINISTRATION",
    "B.B.A",
    "MBA",
    "M.B.A",
    "BCOM",
    "B.COM",
    "BBA",
]

NOT_ALPHA_NUMERIC = r"[^a-zA-Z\d]"

NUMBER = r"\d+"

# For finding date ranges
MONTHS_SHORT = r"""(jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)
                   |(aug)|(sep)|(oct)|(nov)|(dec)"""
MONTHS_LONG = r"""(january)|(february)|(march)|(april)|(may)|(june)|(july)|
                   (august)|(september)|(october)|(november)|(december)"""
MONTH = r"(" + MONTHS_SHORT + r"|" + MONTHS_LONG + r")"
YEAR = r"(((20|19)(\d{2})))"

STOPWORDS = set(stopwords.words("english"))

RESUME_SECTIONS_PROFESSIONAL = [
    "experience",
    "education",
    "interests",
    "professional experience",
    "publications",
    "skills",
    "certifications",
    "objective",
    "career objective",
    "summary",
    "leadership",
]

RESUME_SECTIONS_GRAD = [
    "achievements",
    "accomplishments",
    "experience",
    "education",
    "interests",
    "projects",
    "professional experience",
    "publications",
    "skills",
    "certifications",
    "objective",
    "career objective",
    "summary",
    "leadership",
    "work experience",
    "career profile",
    "work history",
    "professional experience",
    "professional background",
    "internships",
    "summer internship",
]
