import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Otp from "@lib/models/Otp";
import User from "@lib/models/User.js";
import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
const createOtp = async (email) => {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);

await Otp.findOneAndUpdate(
  { email }, 
  {
    otp: otpHash,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  }, 
  { upsert: true, new: true } 
);
  sendOtp(email, otp);
  return otp;
};

const sendOtp=async(email,otp)=>{
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS  // app password, not your Gmail password
  }
});

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
  console.log("OTP sent")
};




export async function POST(req){
  try {
    await dbConnect();
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }
    const userExist=await User.findOne({email})
    if(!userExist){
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await createOtp(email);
    return NextResponse.json({ message: "OTP sent to your email" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
