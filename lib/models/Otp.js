import mongoose from "mongoose";
const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
        unique: true
    },
    expiresAt: {
        type: Date
    }
})

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
export default Otp;