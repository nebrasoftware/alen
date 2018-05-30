#!/bin/bash
export FLASK_APP=server
source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0
