import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    user :{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    message: String,
    status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
    createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
export default Complaint;
