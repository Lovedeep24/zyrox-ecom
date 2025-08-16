import dbConnect from "@lib/dbConnect";
import User from "@lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req,res){
    try {
        await dbConnect();
        const {name,email,password,phone,gender}=await req.json();
        if(!email || !password || !name || !phone || !gender){
            return NextResponse.json({message:"All fields are required"}, {status: 400});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user = new User({
            name,
            email,
            password:hashedPassword,
            phone,
            gender
        });
        await user.save();
        return NextResponse.json({message:"User created successfully"}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"}, {status: 500});
    }
}