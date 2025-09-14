from flask import Blueprint, request, jsonify
from models.User import User
from datetime import datetime, timedelta
import smtplib
import random
from email.mime.text import MIMEText
import os
import jwt  # type: ignore
import requests
from dotenv import load_dotenv

load_dotenv()

otp_bp = Blueprint("otp", __name__)

UPSTASH_REDIS_REST_URL = os.getenv("UPSTASH_REDIS_REST_URL")
UPSTASH_REDIS_REST_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN")
HEADERS = {"Authorization": f"Bearer {UPSTASH_REDIS_REST_TOKEN}"}
JWT_SECRET = os.getenv("JWT_SECRET")

# Helper functions
def redis_set(key, value, ttl_seconds=None):
    url = f"{UPSTASH_REDIS_REST_URL}/set/{key}/{value}"
    if ttl_seconds:
        url += f"?EX={ttl_seconds}"  # optional TTL in seconds
    r = requests.post(url, headers=HEADERS)
    return r.json()

def redis_get(key):
    url = f"{UPSTASH_REDIS_REST_URL}/get/{key}"
    r = requests.get(url, headers=HEADERS)
    return r.json().get("result")

def redis_delete(key):
    url = f"{UPSTASH_REDIS_REST_URL}/del/{key}"
    r = requests.post(url, headers=HEADERS)
    return r.json()


def create_otp(email):
    otp = str(random.randint(1000, 9999))

    # Store OTP in Upstash with 5 min TTL
    res = redis_set(f"otp:{email}", otp, ttl_seconds=300)
    print("Redis set response:", res)
    # Call your function to actually send the OTP via email/SMS
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


@otp_bp.route("/verify-otp", methods=["POST"])
def verify_otp_route():
    try:
        data = request.get_json()
        email = data.get("email")
        entered_otp = data.get("otp")
        mode = data.get("mode")

        if not email or not entered_otp:
            return jsonify({"error": "Email and OTP required"}), 404
        user = User.objects(email=email).first()
        stored_otp = redis_get(f"otp:{email}")
        if not stored_otp:
            return jsonify({"error": "OTP expired or not found"}), 402

        if stored_otp == entered_otp:
            redis_delete(f"otp:{email}")  # cleanup after success
            if mode == "reset":
                            token = jwt.encode(
                                    {"id": str(user.id), "exp": datetime.utcnow() + timedelta(hours=1)},
                                    JWT_SECRET, 
                                    algorithm="HS256"
                                )
                            user_data = {
                                "id": str(user.id),
                                "name": user.name,
                                "email": user.email,
                                "role": user.role,
                                "address": [addr.to_mongo() for addr in user.address] if user.address else [],  
                                "wishlist": [str(p) for p in user.wishlist],
                                "cart": [
                                    {
                                        "product": str(item.product),
                                        "quantity": item.quantity,
                                        "selectedSize": item.selectedSize
                                    }
                                    for item in user.cart
                                ]
                            }
                            return jsonify({"token": token, "user":user}), 200
            else:
                return jsonify({"success": True, "message": "OTP verified"}), 200
                
        else:
            return jsonify({"success": False, "message": "Invalid OTP"}), 400

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
