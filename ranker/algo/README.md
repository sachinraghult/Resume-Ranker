# Ranking Algorithm

1. [Workflow Diagram](#workflow-diagram)
2. [Arguments passed to the Ranking Algorithm](#arguments-passed-to-the-ranking-algorithm)
3. [Code Structure and Main Files](#code-structure-and-main-files)
4. [Working](#working)
5. [Import](#import)
6. [References](#references)

## Workflow Diagram
![Ranking Software](https://user-images.githubusercontent.com/67551786/181000868-99f1d41c-965d-44bf-bab2-b38588cafab6.png)


## Arguments passed to the Ranking Algorithm
- **Resume Entities**: Extracted from Resumes uploaded by Job Searchers
```python
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
- **Job Description**: Fetched from UI, to be uploaded by Job Recruiters
```python
{
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
}
```

## Code Structure and Main Files
- Main Modules
```
|---- algo
        |---- parser (module for parsing the resumes)
                |---- constants.py (lists of subsections/names/stopwords/etc.)
                |---- utils.py (utility functions called by parser)
                |---- parser.py (main class for parsing)
        |---- criteria (module for assigning scores based on each criteria)
                |---- academicCriteria.py (scoring based on academic institutes)
                |---- domainCriteria.py (scoring based on domain experience)
                |---- jobSwitchCriteria.py (scoring based on no. of job switches)
                |---- keywordCriteria.py (scoring based on keyword matching bw resume and jd)
                |---- organizationCriteria.py (scoring based on organizations worked in)
                |---- skillRankCriteria.py (scoring based on skill match with jd)
        |---- database (folder storing data regarding orgs, skills, and academic institutions)
                |---- organizations.txt (file storing organization rankings)
                |---- Engineering.csv (file storing engg clg rankings)
                |---- Management.csv (file storing mgmt clg rankings)
                |---- skills.csv (fiel storing skillsets)
```

- Helper Modules and Files
```
|---- algo
        |---- ner (called in parser)
                |---- spacyNer (uses spacy ner fine-tuned with roberta transformers for extraction of college names)
                           |---- config.py
                           |---- ner.py
        |---- utils.py (file containing utility functions)
        
|---- config (module containing file ids for pre-trained weights)
        |---- weights_download.json
|---- weights (module for downloading trained ner, word2vec, and other helper models)
        |---- download.py (download script for weights download from gdrive via gdown)
```

- Main Scoring Files
```
|---- algo
        |---- ranker.py (file returning weighted average of scores based on individual criterion, makes function calls to all main modules within algo)
|---- test.py (file calling the ranker module and returing ranks of a bunch of resumes in a table by a simple sorting mechanism of scores appended)
```

## Working
### High Level
- Arguments (resume_path, jobdescription) are passed within the `../test.py` file to the function called using `Scorer()` object from `ranker.py`
- All objects from `parser` and `criteria` module are initialized 
- All entitities are extracted from the resumes using the `ResumeParser()` object
- Scores for each criterion are calculated and stored using objects created from `criteria` module, passing corresponding entities keys and jobdescription keys as arguments
- Each score is multiplied by their weights and stored in a list
- Overall score is calculated by taking the mean of the weighted scores and appended to the beginning of the list
- This list is returned to the `../test.py` file
- The returned list is sorted in descending order based on the overall scores for each resume and displayed in a table

### Details of Each Criterion
- **academicCriteria**: 
        
       - College name and Degree are passed as arguments 
       - Fuzzysets is applied to extract a generalized name for the institutions
       - Institute matching with database depending upon the Degree (Engineering/Management)
       - Database has the names of the institutes ordered by rank, hence (index of institute)+1 gives the rank
       - Scoring is based on this index passed in a mathematical function: 1000 * math.exp(-(ranks) / 400)
       - Normalized score (using sigmoid function) is returned
       
- **domainCriteria**:

       - Experience and Job Description is passed as arguments
       - Encoding of both arguments is performed using pre-trained transformers
       - Scoring is based on "cosine similarity" 
       - Mean score is returned
       
- **jobSwitchCriteria**:

       - List of organizations is passed as argument
       - Length of the list of organizations is calculated to find the number of job switched
       - Scoring is based on a hand coded exponentially decreasing function
       - Normalized score is returned
       
- **keywordCriteria**:

       - Text extracted from the resume and Keywords given in Job Description are passed as arguments
       - More keywords are extracted from the job description and stored
       - Vectorization is performed using "word2vec" 
       - In case word2vec results in KeyError, "tfidf" is used
       - Scoring is based on maching using "cosine similarity"
       - Normalized score is returned
       
- **organizationCriteria**:

       - List of organizations is passed as argument
       - Fuzzysets is applied to extract a generalized name for the organization
       - Organization matching with database
       - Database has the names of the organizations ordered by rank, hence (index of institute)+1 gives the rank
       - Scoring is based on this index passed in a mathematical function: 1000 * math.exp(-(ranks) / 400)
       - Normalized score (using sigmoid function) is returned
       
- **skillRankCriteria**:

       - Skills extarcted from resume and weighted skills mentioned in the jobdescription are passed as arguments
       - Vectorization is performed using "word2vec" 
       - In case word2vec results in KeyError, "tfidf" is used
       - Scoring is based on maching using "cosine similarity"
       - Score calculated for each is multiplied with its given weight and added
       - Normalized score is returned

### Import
**The** `ranker.py` **file is called in the main test file to get the final scoring of the resumes based on which ranks are calculated**. <br>
The class from `ranker.py` can be imported into `../test.py` and initialized by:
```python
from algo import Scorer
scorer = Scorer()
```

## References
Reference Type | Reference Link 
:----------: | :----------- |
Datasets | - [Resume Dataset](https://www.kaggle.com/datasets/gauravduttakiit/resume-dataset) <br> - [Resume Corpus](https://github.com/florex/resume_corpus) <br> - [Online Job Posting](https://www.kaggle.com/datasets/madhab/jobposts/code?resource=download) <br> 
Blogs | - [NLP made easy using SpaCy](https://www.analyticsvidhya.com/blog/2017/04/natural-language-processing-made-easy-using-spacy-%E2%80%8Bin-python/) <br> - [Keyword Extraction with NLP](https://www.andyfitzgeraldconsulting.com/writing/keyword-extraction-nlp/) <br> - [Keyword Extraction Process with NLP](https://towardsdatascience.com/keyword-extraction-process-in-python-with-natural-language-processing-nlp-d769a9069d5c) <br> - [tf-idf vs word2vec vs BERT](https://towardsdatascience.com/text-classification-with-nlp-tf-idf-vs-word2vec-vs-bert-41ff868d1794) <br> - [Information Extraction from CV](https://www.hindawi.com/journals/mpe/2018/5761287/) |
Libraries | - [spacy](https://spacy.io/) <br> - [pyresparser](https://omkarpathak.in/pyresparser/) <br> - [resume-parser](https://pypi.org/project/resume-parser/) <br> - [transformer](https://huggingface.co/docs/transformers/index) <br> - [fuzzyset](https://pypi.org/project/fuzzyset/) <br> 
Research Papers | - [Duplicate Resume Checker](https://arxiv.org/abs/1908.10084) <br> &nbsp; (Sentence-BERT: Sentence Embeddings <br> &nbsp; using Siamese BERT-Networks) <br> - [Resume Ranker IOSRJEN](https://www.researchgate.net/publication/335219236_Resume_Ranker)
Notebooks <br> Pre-trained weights | - [Guide to NLP in SpaCy](https://www.kaggle.com/code/nirant/hitchhiker-s-guide-to-nlp-in-spacy/notebook) <br> - [Google word2vec](https://code.google.com/archive/p/word2vec/) <br> - [Google Word2Vec pretrained weights](https://huggingface.co/fse/word2vec-google-news-300)

<hr>

- Check out the documentation for parser initialization [here](https://github.com/RameshSankarS/TEAM-B4/blob/main/ranker/algo/parser/README.md).
- Check out the documentation for fuzzyset file generation [here](https://github.com/RameshSankarS/TEAM-B4/blob/main/ranker/algo/fuzzysets/README.md).
- Check out the documentation for each criteria initialization [here](https://github.com/RameshSankarS/TEAM-B4/blob/main/ranker/algo/criteria/README.md).

