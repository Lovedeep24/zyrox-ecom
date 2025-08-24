from flask import Flask, request, jsonify,Blueprint
import datetime
from models.User import User
from models.Otp import Otp
import os
import bcrypt
import jwt  # type: ignore


from dotenv import load_dotenv

load_dotenv()

login_bp = Blueprint("login", __name__)
JWT_SECRET = os.getenv("JWT_SECRET")
print(JWT_SECRET)

@login_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        otp = data.get("otp")

        user = User.objects(email=email).first()
        if not user:
            return jsonify({"message": "User not found"}), 404

        if not password:
            user_otp = Otp.objects(email=email).first()
            if not user_otp:
                return jsonify({"message": "OTP not found"}), 400

            if not bcrypt.checkpw(otp.encode("utf-8"), user_otp.otp.encode("utf-8")):
                return jsonify({"message": "Invalid OTP"}), 401

            if user_otp.expiresAt < datetime.datetime.utcnow():
                return jsonify({"message": "OTP expired"}), 400
            
            token = jwt.encode(
                {"id": str(user.id), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                JWT_SECRET,   
                algorithm="HS256"
            )

  
            return jsonify({"token": token, "user": {"email": user.email, "id": str(user.id)}}), 200


        if not otp:
            print("Entered pass")
            if not bcrypt.check_password_hash(user.password, password):
                return jsonify({"message": "Invalid Password"}), 402

            token = jwt.encode(
                {"id": str(user.id), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                JWT_SECRET, 
                algorithm="HS256"
            )

   
            return jsonify({"token": token, "user": {"email": user.email, "id": str(user.id)}}), 200

        return jsonify({"message": "Invalid request"}), 400

    except Exception as e:
        print(e)
        return jsonify({"message": "Internal Server Error"}), 500


