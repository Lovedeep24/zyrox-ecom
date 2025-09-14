from flask import Flask, request, jsonify,Blueprint
import datetime
from models.User import User
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

        user = User.objects(email=email).first()
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        if not  bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({"message": "Invalid Password"}), 401
        token = jwt.encode(
            {"id": str(user.id), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
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
        return jsonify({"token": token, "user": user_data}), 200


    except Exception as e:
        print(e)
        return jsonify({"message": "Internal Server Error"}), 500


