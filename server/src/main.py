import requests
import flask
import time
import pymongo

from flask import Flask, request, jsonify
from time import strftime, strptime, time, gmtime
from pymongo import MongoClient

app = flask.Flask(__name__)

app.config.from_pyfile('settings.py')

if app.config.get("MONGODB_URL"):
    client = MongoClient(app.config.get("MONGODB_URL"))
else:
    client = MongoClient('mongodb://localhost:27017/tutoring')

db = client.tutoring

# student_data = {
#     "classCode": "UNCC-CHA-FSF-PT-10-2020-U-C",
#     "graduationDate": strftime("%b %d %Y",strptime("30 May 21", "%d %b %y")),
#     "fullName": "Jon Jackson",
#     "email": "ocskier@gmail.com",
#     "githubId": "ocskier",
#     "sessionsWeek": 2,
#     "timeDiff": 0,
#     "zoomLink": "https://someUrl.com",
#     "startingPoint": "Pre-work",
#     "timestamp": gmtime()
# }

students = db.students.find({})

# @app.route('/api/v1/resources/books/all', methods=['GET'])
# def api_all():
#     return jsonify(books)


@app.route('/api/students', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    
    # Create an empty list for our results
    results = []
    
    if 'id' in request.args:
        id = int(request.args['id'])
           
        # Loop through the data and match results that fit the requested ID.
        # IDs are unique, but other fields might return many results
        for student in students:
            if student['_id'] == id:
                student['_id'] = str(student['_id'])
                results.append(student)
    else:
        for student in students:
            student['_id'] = str(student['_id'])
            results.append(student);

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)


@app.route("/current-time")
def get_timestamp():
    return {'time': time()}


