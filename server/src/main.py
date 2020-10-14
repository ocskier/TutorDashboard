import requests
import flask
import time

from flask import Flask, request, jsonify
from time import strftime, strptime, time, gmtime

app = flask.Flask(__name__)

app.config['host'] = 'localhost'

app.config.from_pyfile('settings.py')

# Create some test data for our catalog in the form of a list of dictionaries.
students = [
    {
        "class-code": "UNCC-CHA-FSF-PT-10-2020-U-C",
        "Graduation Date": strftime("%b %d %Y",strptime("30 May 21", "%d %b %y")),
        "Full Name": "Jon Jackson",
        "Email": "ocskier@gmail.com",
        "Github Id": "ocskier",
        "Sessions/Week": "2",
        "Time Difference": 0,
        "Zoom Link": "SomeUrl.com",
        "Starting Point": "Pre-work",
        "timestamp": gmtime()
    },
]


# @app.route('/api/v1/resources/books/all', methods=['GET'])
# def api_all():
#     return jsonify(books)


@app.route('/api/students', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return jsonify(students)

    # Create an empty list for our results
    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for student in students:
        if student['id'] == id:
            results.append(student)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)


@app.route("/current-time")
def get_timestamp():
    return {'time': time()}

app.run()

# financeData.chart.result[0].indicators.adjclose[0].adjclose.map(
#           (close, i) => {
#             return {
#               close: close,
#               time: financeData.chart.result[0].timestamp[i] * 1000,
#             };
#           }
#         )
