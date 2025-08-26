from flask import Flask, request, jsonify, Blueprint
from models.Product import Product  # your Product model

# --- Setup Blueprint ---
product_bp = Blueprint("product", __name__)

@product_bp.route("/addProduct", methods=["POST"])
def add_product():
    data = request.get_json()

    required_fields = ["name", "description", "price", "size", "material", "category", "gender", "brand", "availableStock"]
    missing = [field for field in required_fields if not data.get(field) or (field == "size" and len(data.get("size", [])) == 0)]
    
    if missing:
        return jsonify({"message": f"Missing fields: {', '.join(missing)}"}), 400

    try:
        product = Product(
            name=data["name"],
            description=data["description"],
            price=data["price"],
            size=data["size"],
            material=data["material"],
            category=data["category"],
            gender=data["gender"],
            brand=data["brand"],
            availableStock=data["availableStock"],
            isOnSale=data.get("isOnSale", False),
            salePercent=data.get("salePercent", 0)
        )

        product.save()  # save to MongoDB

        return jsonify({"message": "Product added successfully"}), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Internal Server Error"}), 500
