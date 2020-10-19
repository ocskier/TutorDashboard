import requests
import flask
import json
import datetime
import models
import mongoengine

from flask import Flask, request, jsonify, render_template
from datetime import  datetime
from mongoengine import connect
from models.students import Students

app = flask.Flask(__name__, static_url_path='', static_folder='build', template_folder="build")

app.config.from_pyfile('settings.py')

if app.config.get("MONGODB_URL"):
    connect(host=app.config.get("MONGODB_URL"))
else:
    connect('tutoring')

# @app.route('/api/v1/resources/books/all', methods=['GET'])
# def api_all():
#     return jsonify(books)
studentSeed = Students(
    classCode= "UNCC-CHA-FSF-PT-10-2020-U-C",
    graduationDate = datetime(2021, 5, 31),
    fullName = "Jon Jackson",
    email = "ocskier@gmail.com",
    githubId = "ocskier",
    sessionsWeek = 2,
    timeDiff = 0,
    zoomLink = "https://someUrl.com",
    startingPoint = "Pre-work"
)

if Students.objects.count() == 0:
    studentSeed.save()

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
        for student in Students.objects:
            if student.id == id:
                results.append(json.loads(student.to_json()))

    else:
        for student in Students.objects:
            results.append(json.loads(student.to_json()))
    
    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.

    return jsonify(results)

@app.route('/api/students', methods=['POST'])
def api_post_students():
    newData=json.loads(request.data)
    new_student=Students(
        classCode=newData['classCode'],
        graduationDate=datetime(newData['graduationDate'][0],newData['graduationDate'][1],newData['graduationDate'][2]),
        fullName = newData['fullName'],
        email = newData['email'],
        githubId = newData['githubId'],
        sessionsWeek = newData['sessionsWeek'],
        timeDiff = newData['timeDiff'],
        zoomLink = newData['zoomLink'],
        startingPoint = newData['startingPoint']
    )
    print(new_student)
    new_student.save()
    return new_student.to_json()

@app.route("/current-time")
def get_timestamp():
    return {'time': datetime.now().timestamp()}

@app.route("/")
def my_index():
    return render_template("index.html")

