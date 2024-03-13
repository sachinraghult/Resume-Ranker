import warnings
import os
from prettytable import PrettyTable
from weights import DownloadWeights

warnings.filterwarnings("ignore")
warnings.warn("DelftStack")
warnings.warn("Do not show this message")

# downloading all required weights at one go
print("Starting Weights Download... ")
downloader = DownloadWeights()
downloader.check_weights()

from algo import Scorer

# testing celery tasks
print("Running Data Preprocess...")
# <application_id>
# run_preprocess("62c07158d06bc4cf85780fec")

# testing Scorer Class
print("Executing Scoring...")
scorer = Scorer()

jobdescription = {
    "title": "SDE",
    "desc": "Individual Contributor Role focused on developing RIA application using ML",
    "exp": "Bachelor's degree in Engineering. \nGood spoken and written English skills to effectively communicate technical concepts. \nStrong logical, analytical skills and a systematic problem solving approach. \nGood understanding of Software Development Life Cycle (SDLC).\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\nAbility to research and report on a variety of issues using problem solving skills.\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
    "skills": [
        {"skill": "Python", "value": 75},
        {"skill": "machine-learning", "value": 25},
    ],
    "keywords": [{"keyword": "Python"}, {"keyword": "ML"}],
    "tags": "Internship",
}


resume_dir = r"examples/resumes/"
resumes = os.listdir(resume_dir)
results = []

for i in resumes:
    resume_path = os.path.join(resume_dir, i)
    entities, score, orgScore, JscScore, aScore, sScore, dScore, kScore = scorer.score(
        resume_path, jobdescription
    )
    results.append([i, score, orgScore, JscScore, aScore, sScore, dScore, kScore])

print("Ranking Resumes...")
results.sort(key=lambda x: x[1], reverse=True)
myTable = PrettyTable(
    [
        "Rank",
        "Resume",
        "Overall Score",
        "Org Score",
        "Job Switch Score",
        "Academic Score",
        "Skill Match Score",
        "Experience Score",
        "KeyWords Score",
    ]
)


for i in range(len(results)):
    myTable.add_row(
        [
            i + 1,
            results[i][0],
            results[i][1],
            results[i][2],
            results[i][3],
            results[i][4],
            results[i][5],
            results[i][6],
            results[i][7],
        ]
    )

print(myTable)
