#!/bin/bash

# download weights
python weights/download.py

# run celery worker
celery -A celery_tasks worker --loglevel=INFO --pool=eventlet
