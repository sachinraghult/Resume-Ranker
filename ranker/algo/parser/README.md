# Ranking Algorithm

This is the main module for parsing a resume. The entities parsed include:
```
{
    "skills": [],
    "college_name": [],
    "experience": [],
    "company_names": [],
    "total_experience": [],
    "jd_key_words":[],
    "degree":None,
    "text": None,
}
```

## Initialization and Extraction
```python
from algo.parser import ResumeParser

path = "<path/to/resume/file>"
jd = {
        "title":
            "SDE",
        "desc":
            "Individual Contributor Role focused on developing RIA application using ML",
        "exp": 
            "Bachelor's degree in Engineering. \nGood spoken and written English skills to effectively communicate technical concepts. \nStrong logical, analytical skills and a systematic problem solving approach. \nGood understanding of Software Development Life Cycle (SDLC).\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\nAbility to research and report on a variety of issues using problem solving skills.\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
        "skills": 
            [{ "skill":"Python", "value":75},{ "skill":"machine-learning", "value":25}],
        "keywords":
            [{"keyword":"Python"}, {"keyword":"ML"}],
        "tags":
            "Internship"
    }       # <dict/of/jobdescription>

parser = ResumeParser()
entities = parser.extract(path, jd)
```

**Entities extracted using** `parser` **are passed to the respective ranking criterion**
