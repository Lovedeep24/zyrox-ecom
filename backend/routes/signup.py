# routes/user_routes.py
from flask import Blueprint, request, jsonify
from models.User import User
from mongoengine.errors import ValidationError, NotUniqueError
import bcrypt
signup_bp = Blueprint("user", __name__)

@signup_bp.route("/signup", methods=["POST"])
def register_user():
    data = request.get_json()
    print(data)
    hashed_password = bcrypt.hashpw(data.get("password").encode('utf-8'), bcrypt.gensalt())
    try:
        user = User(
            name=data.get("name"),
            email=data.get("email"),
            password=hashed_password,
            gender=data.get("gender")
        )
        user.save() 
        return jsonify({"message": "User created successfully"}), 201

    except ValidationError as e:
        return jsonify({"error": str(e)}), 400  # bad request if validation fails
    except NotUniqueError:
        return jsonify({"error": "Email already exists"}), 409  # conflict if duplicate
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # generic server error
