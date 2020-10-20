import smtplib, ssl, os

port = 465
context = ssl.create_default_context()

def sendEmail(sender, recipient):
    adminUser = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    sender = sender
    receivers = recipient

    message = f"From: From Person <{sender}>\nTo: To Person <{recipient}>\nMIME-Version: 1.0\nContent-type: text/html\nSubject: SMTP HTML e-mail test\n\nThis is an e-mail message to be sent in HTML format\n\n<b>This is HTML message.</b>\n<h1>This is headline.</h1>"
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com',port,context=context) as server:
            server.login(adminUser,password)
            server.sendmail(sender, receivers, message)         
            print("Successfully sent email") 
    except smtplib.SMTPException:
        print("Error: unable to send email")