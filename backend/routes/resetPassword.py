# routes/user_routes.py
from flask import Blueprint, request, jsonify
from models.User import User
from mongoengine.errors import ValidationError
import bcrypt
reset_bp = Blueprint("reset", __name__)

@reset_bp.route("/reset-password", methods=["PATCH"])
def reset_password():
    data=request.get_json()
    email = data.get("email")
    new_password = data.get("newPassword")
    if(not email or not new_password):
        return jsonify({"error": "Email and new password required"}), 404
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    try:
        user = User.objects(email=email).first()
        user.update(password=hashed_password)
        return jsonify({"message": "Password updated successfully"}), 200

    except ValidationError as e:
        return jsonify({"error": str(e)}), 400 
    except Exception as e:
        return jsonify({"error": str(e)}), 500  
