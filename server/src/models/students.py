from datetime import  datetime
from mongoengine import Document, IntField, ObjectIdField, StringField, DateTimeField

class Students(Document):
    classCode = StringField(required=True, max_length=200)
    graduationDate = DateTimeField()
    fullName = StringField(required=True, max_length=100)
    email = StringField(required=True, max_length=100)
    githubId = StringField(required=True, max_length=50)
    sessionsWeek = IntField(required=True, default=1)
    timeDiff = IntField(default=0)
    zoomLink = StringField(max_length=200)
    startingPoint = StringField(max_length=200)
    timestamp = DateTimeField(default=datetime.utcnow)