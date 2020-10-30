def emailHtml(data):
    return """\
    <html>
    <body>
        <p>Hi,<br>
        <br>
            Thank you for scheduling your first session with me which will occur on <br>
        <br>
        {date}.<br>
        <br>
        This session will take place here: <a href="{zoomLink}">Zoom Link</a> <br>
        <br>
        (If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br>
        <br>
        Again, all I need from you:</p>
        <ul>
            <li>Be on <a href="https://tutorshelpingstudents.slack.com/">Tutors & Students</a> Slack 5 minutes before your time slot.</li>
            <li>Make sure your computer/mic/internet connection is working.</li>
            <li>Make sure your workspace is quiet and free from interruptions.</li>
            <li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li>
        </ul>
        <p>Slack or email me with any questions.  I’m looking forward to our meeting!<br>
        <br>
        Please Reply All to this email so that I know you have seen it.<br>
        <br>
        (CC Central Support on all tutor email by always using REPLY ALL).<br>
        <br>
        Sincerely,<br>
        <br>{fullName}</p>
    </body>
    </html>
    """.format(
        date="Tomorrow",
        zoomLink=data["zoomLink"],
        fullName=data["fullName"],
    )