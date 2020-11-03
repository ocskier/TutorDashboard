import smtplib, ssl, os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from .html_template import emailHtml
from .text_template import emailText

port = 465
context = ssl.create_default_context()

def sendEmail(emailData):
    adminUser = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    sender = emailData["tutor"]
    receivers = emailData["recipient"]

    message = MIMEMultipart("alternative")
    message["Subject"] = "Tutor Confirmation"
    message["From"] = adminUser
    message["To"] = receivers
    message["Cc"] = sender, "centraltutor@bcs.com"

    text = emailText(emailData)
    html = emailHtml(emailData)

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com',port,context=context) as server:
            server.login(adminUser,password)
            server.sendmail(adminUser, receivers, message.as_string())
            print("Successfully sent email") 
    except smtplib.SMTPException:
        print("Error: unable to send email")