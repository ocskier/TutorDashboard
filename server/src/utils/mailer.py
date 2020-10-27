import smtplib, ssl, os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

port = 465
context = ssl.create_default_context()

def sendEmail(sender, recipient):
    adminUser = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    sender = sender
    receivers = recipient

    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender
    message["To"] = recipient

    text = """\
    Hi,
    Thank you for scheduling your first session with me which will occur on 
    Tuesday, October 27 - 10:30 am (Central Time - US & Canada).
    This session will take place here: https://zoom.us/
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
    Jon Jackson
    """
    html = """\
    <html>
    <body>
        <p>Hi,<br>
        <br>
            Thank you for scheduling your first session with me which will occur on <br>
        <br>
        Tuesday, October 27 - 10:30 am (Central Time - US & Canada).<br>
        <br>
        This session will take place here: <a href="http://www.zoom.com">Real Python</a> <br>
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
        <br>Jon Jackson</p>
    </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1);
    message.attach(part2);
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com',port,context=context) as server:
            server.login(adminUser,password)
            server.sendmail(sender, receivers, message.as_string())
            print("Successfully sent email") 
    except smtplib.SMTPException:
        print("Error: unable to send email")