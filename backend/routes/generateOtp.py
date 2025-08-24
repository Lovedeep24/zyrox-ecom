from flask import Blueprint, request, jsonify
from models.Otp import Otp
from models.User import User
from datetime import datetime, timedelta
import bcrypt
import smtplib
import random
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

otp_bp = Blueprint("otp", __name__)

def create_otp(email):
    otp = str(random.randint(100000, 999999))

    otp_hash = bcrypt.hashpw(otp.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    Otp.objects(email=email).update_one(
        set__otp=otp_hash,
        set__expiresAt=datetime.utcnow() + timedelta(minutes=5),
        upsert=True
    )

    send_otp(email, otp)
    return otp

def send_otp(email, otp):
    sender_email = os.getenv("EMAIL_USER")
    sender_pass = os.getenv("EMAIL_PASS")

    msg = MIMEText(f"Your OTP code is {otp}. It is valid for 5 minutes.")
    msg["Subject"] = "Your OTP Code"
    msg["From"] = sender_email
    msg["To"] = email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_pass)
            server.sendmail(sender_email, email, msg.as_string())
        print("OTP sent successfully")
    except Exception as e:
        print("Error sending OTP:", e)


@otp_bp.route("/send-otp", methods=["POST"])
def send_otp_route():
    try:
        data = request.get_json()
        email = data.get("email")

        if not email:
            return jsonify({"error": "No email provided"}), 400

        user = User.objects(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        create_otp(email)
        return jsonify({"message": "OTP sent to your email"}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
