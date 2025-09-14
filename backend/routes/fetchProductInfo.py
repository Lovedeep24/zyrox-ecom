from flask import Blueprint, request, jsonify
from models.Product import Product  # Assuming this is a MongoEngine or PyMongo model
from bson import ObjectId

fetchProductInfo_bp = Blueprint("fetchProduct", __name__)

#------------F E T C H    A L L   P R O D U C T S------------------------------ 

@fetchProductInfo_bp.route("/fetch-all-products", methods=["GET"])
def fetch_all_products():
    try:
        # If you're using MongoEngine:
        products = Product.objects()  # fetch all documents
        products_list = [product.to_mongo().to_dict() for product in products]

        # Convert ObjectId and datetime to string for JSON
        for p in products_list:
            p["_id"] = str(p["_id"])
            if "createdAt" in p:
                p["createdAt"] = str(p["createdAt"])

        return jsonify({"success": True, "products": products_list}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# -----------F E T C H    S I N G L E    P R O D U C T   I N F O -----------------

@fetchProductInfo_bp.route('/fetch-product-info', methods=['GET'])
def fetch_single_product_info():
    product_id = request.args.get('productId')

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400

    # Validate ObjectId
    if not ObjectId.is_valid(product_id):
        return jsonify({"error": "Invalid product ID"}), 400

    product_obj_id = ObjectId(product_id)
    product = Product.objects(id=product_obj_id).first()

    if product:
        product_dict = product.to_mongo().to_dict()
        # Convert _id to string for JSON serialization
        product_dict["_id"] = str(product_dict["_id"])

        # Optional: convert nested ObjectIds if any (like in `size` array)
        if "size" in product_dict:
            for s in product_dict["size"]:
                if "_id" in s:
                    s["_id"] = str(s["_id"])

        return jsonify(product_dict), 200

    return jsonify({"error": "Product not found"}), 404