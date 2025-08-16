import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtPurchase: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: "pending" },
  paymentMethod: String,
  paymentStatus: { type: String, default: "unpaid" },
  shippingAddress: Object,
  trackingNumber: String,
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order
