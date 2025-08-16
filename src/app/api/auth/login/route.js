import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '@lib/models/User';
import Otp from '@lib/models/Otp';
import { NextResponse } from "next/server";
export async function POST(req,res){
    try {
        const {email,password,OTP}=await req.json();
        const user = await User.findOne({email})
        if(!user) return NextResponse.json({message:"User not found"}, {status: 404});  
        if(email && OTP){
            const userOtpData = await Otp.findOne({ email });
            const isMatch = await bcrypt.compare(OTP, userOtpData.otp);
            if(userOtpData.expiresAt < Date.now()){
                return NextResponse.json({message:"OTP expired"}, {status: 400});
            }else if(!isMatch){
                return NextResponse.json({message:"Invalid OTP"}, {status: 401});
            }
            else{
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return NextResponse.json({token,user}, {status: 200});
            }
        }
        if(email && password)
        {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return NextResponse.json({message:"Invalid Password"}, {status: 402});
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return NextResponse.json({token,user}, {status: 200});
        }
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"Internal Server Error"}, {status: 500});
    }
}