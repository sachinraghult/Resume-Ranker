import pymongo
from bson.objectid import ObjectId

import spacy
from spacy.matcher import Matcher

import requests
import json
import os
import zipfile
import filetype

from algo.ranker import Scorer
from algo.parser.utils import *

SERVER_URL = os.environ.get("SERVER_URL", "http://localhost:5000")
AUTH_TOKEN = os.environ.get(
    "AUTH_TOKEN",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2I1ODFjZGVhYzU4NWUxNjQxNTBlNSIsImlhdCI6MTY1NzQ5MzYyMH0.ySVHT7FLjx-Sttn1PCSP8QKATEqNIA1s3rzT5uoDhzE",
)


def connect_to_db(url):
    client = pymongo.MongoClient(url)
    db = client.ccibt9
    return db


def get_application(db_conn, application_id):
    application = db_conn.applications.find_one({"_id": ObjectId(application_id)})

    if application is None:
        raise ValueError("Could not find an application with the given application_id")

    return application


def create_application(post_id, name, resume_path, authToken):
    url = SERVER_URL + "/utils/upload"
    headers = {"Authorization": authToken}
    data = {"name": os.path.split(resume_path)[-1]}
    files = {"file": open(resume_path, "rb")}
    resp = requests.post(url, headers=headers, data=data, files=files)

    if not resp.ok:
        raise Exception("Failed to upload resume")

    file = json.loads(resp.content)

    url = SERVER_URL + f"/post/{post_id}/apply"
    data = {
        "name": name,
        "resumeId": file["_id"],
    }
    resp = requests.post(url, headers=headers, json=data)

    if not resp.ok:
        print
        raise Exception("Failed to create application")

    return resp


def get_post(db_conn, post_id):
    post = db_conn.posts.find_one({"_id": ObjectId(post_id)})

    if post is None:
        raise ValueError("Could not find an post with the given post_id")

    return post


def get_file(db_conn, file_id):
    file = db_conn.files.find_one({"_id": ObjectId(file_id)})

    if file is None:
        raise ValueError("Could not find bulk file with the given file_id")

    return file


def download_file(url, fname, path="sample/"):
    """
    Parameters:

    - url: url to the uploaded zip file

    - file_name: name of zip file

    - path: directory of temporary local storage of downloaded resume file
    """

    try:
        if not os.path.exists(path):
            os.mkdir(path)
    except Exception:
        os.mkdir(path)

    path = os.path.join(path, fname)

    res = requests.get(url)

    if res.ok:
        with open(path, "wb") as file:
            file.write(res.content)
    else:
        print(res)
        raise Exception("Could not download resume")

    print("Resumes downloaded successfully! Stored at {}".format(path))
    return path


def extract_zip(path, r_path="sample/"):
    """
    Parameter:

    - path: path to zip file

    - r_path: path for zip file extraction
    """
    try:
        if not os.path.exists(r_path):
            os.mkdir(r_path)
    except Exception:
        os.mkdir(r_path)

    print("Extracting Content!")

    zip = zipfile.ZipFile(path, "r")
    zip.extractall(r_path)

    print("Resumes extracted successfully")

    files = filter(lambda f: f.endswith(".pdf"), zip.namelist())

    files = [
        os.path.join(r_path, f)
        for f in files
        if filetype.guess(os.path.join(r_path, f)) == filetype.types[49]
    ]

    return files


def extract_name_from_resume(path):

    nlp = spacy.load("en_core_web_sm")
    raw_text = extract_text(path, os.path.splitext(path)[1])
    text = " ".join(raw_text.split())

    __nlp__ = nlp(text)
    __matcher__ = Matcher(nlp.vocab)

    return extract_name(__nlp__, matcher=__matcher__)


def preprocess(path, jobDesription):
    """
    Parameters:

    - path: path to resume file to be deleted
    """
    scorer = Scorer()
    entities, score, orgScore, JscScore, aScore, sScore, dScore, kScore = scorer.score(
        path, jobDesription
    )
    entities["scores"] = [score, sScore, dScore, orgScore, JscScore, kScore, aScore]
    return entities


def delete_resume_local(path):
    """
    Parameters:

    - path: path to resume file to be deleted
    """

    if os.path.exists(path):

        if os.path.isdir(path):
            os.rmdir(path)

        elif os.path.isfile(path):
            os.remove(path)

        print("Local copy of resume deleted from {}".format(path))

    else:
        raise FileNotFoundError(
            "The File/Folder you are trying to remove does not exist! Please try a different path!"
        )
    pass


def save_preprocessing_data(db_conn, resume_id, ser_data):
    ser_data = json.dumps(ser_data)

    resumes = db_conn.applications

    resumes.find_one_and_update(
        {"_id": ObjectId(resume_id)}, {"$set": {"preprocessing_data": ser_data}}
    )


def fetch_preprocessing_data(db_conn, resume_id):
    resumes = db_conn.applications

    resume = resumes.find_one({"_id": ObjectId(resume_id)})

    if resume:
        return resume["preprocessing_data"]
    else:
        raise ValueError("Could not find a resume with the given resume_id")
