def emailText(data):
    return """\
    Hi,
    Thank you for scheduling your first session with me which will occur on 
    {date}.
    This session will take place here: {zoomLink}
    (If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)
    Again, all I need from you:
    Be on Tutors & Students Slack 5 minutes before your time slot.
    Make sure your computer/mic/internet connection is working.
    Make sure your workspace is quiet and free from interruptions.
    At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.
    Slack or email me with any questions.  I’m looking forward to our meeting!
    Please Reply All to this email so that I know you have seen it.
    (CC Central Support on all tutor email by always using REPLY ALL).
    Sincerely,
    {fullName}
    """.format(
        date="Tomorrow",
        zoomLink=data["zoomLink"],
        fullName=data["fullName"],
    )