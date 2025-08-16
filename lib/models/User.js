import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  gender: { type: String, enum: ["male", "female", "unisex"] },
  address: [
    {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    }
  ],
  role: { type: String, default: "user" },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      selectedSize: String,
      selectedColor: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;