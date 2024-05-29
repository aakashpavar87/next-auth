import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";

connectDB()

export async function GET(request: NextRequest) {
    try {
        const users = await User.find()
        return NextResponse.json({users});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        // validation
        console.log(username);
        console.log(email);
        console.log(password);

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log(hashedPassword);
        
        
        const newUser = new User({username, email, password: hashedPassword})
        const savedUser = await newUser.save()

        console.log(savedUser);

        // Send Verification Email
        await sendEmail({email, emailType:"Verify", userId: savedUser._id})
        
        return NextResponse.json({message: "User registered successfully !!!", success: true, savedUser})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500});
    }
}