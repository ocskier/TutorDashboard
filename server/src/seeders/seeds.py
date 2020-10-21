from datetime import datetime
from ..models.students import Students

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