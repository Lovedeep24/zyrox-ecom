import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  size: [String],
  color: [String],
  material: String,
  category: { type: String, enum: ["tshirt", "shoe", "combo", "shorts", "accessories"] },
  gender: { type: String, enum: ["male", "female", "unisex"] },
  brand: String,
  photos: [String],
  tags: [String],
  availableStock: Number,
  variants: [
    {
      size: String,
      color: String,
      stock: Number
    }
  ],
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  isOnSale: Boolean,
  salePercent: Number,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product
