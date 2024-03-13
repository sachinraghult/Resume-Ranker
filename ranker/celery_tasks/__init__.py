from weights import *
from db_utils import *
import pprint
import json
from celery import Celery

print("starting celery worker")


BROKER_URL = os.environ.get("BROKER_URL", "amqp://localhost")

app = Celery(
    "tasks",
    broker=BROKER_URL,
)


@app.task
def add(x, y):
    return x + y


@app.task(name="tasks.run_preprocess")
def run_preprocess(application_id):
    db = connect_to_db(DB_URL)

    application = get_application(db, application_id)

    print(application)

    file = get_file(db, application["resume"])

    url = file["url"]
    fname = file["name"]

    resume_path = download_file(url, fname)

    post = get_post(db, application["post"])

    data = preprocess(resume_path, post)

    if not data["isCorrupted"]:
        save_preprocessing_data(db, application_id, data)
        data = fetch_preprocessing_data(db, application_id)
        data = json.loads(data)
        pprint.pprint(data)

    delete_resume_local(resume_path)


@app.task(name="tasks.bulk_upload_job")
def bulk_upload_job(job, authToken):
    db = connect_to_db(DB_URL)

    post = get_post(db, job["post"])
    file = get_file(db, job["file"])

    url = file["url"]
    fname = file["name"]

    file_path = download_file(url, fname)

    resume_files = extract_zip(file_path)

    filter(lambda f: f.endswith(".pdf"), resume_files)

    for resume in resume_files:

        extracted_name = extract_name_from_resume(resume)
        if not extracted_name:
            extracted_name = fname.split(".")[0]
        resp = create_application(str(post["_id"]), extracted_name, resume, authToken)
        pprint.pprint(resp.content)

    print("DONE!")


if __name__ == "__main__":
    result = add.apply_async((1, 2), serializer="json")
    print(result.get())
