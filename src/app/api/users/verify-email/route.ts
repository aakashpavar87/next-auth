import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";

connectDB()


export async function GET(request: NextRequest) {
    return NextResponse.json({message: "This is verify-email route"})
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        if(token) {
            const user = await User.findOne({isVerifiedToken: token, isVerifiedExpiry: {$gt: Date.now()}})
            if(!user) {
                return NextResponse.json({error: "Invalid Token"}, {status: 400});
            }

            console.log(user);
            user.isVerified = true;
            user.isVerifiedToken = undefined;
            user.isVerifiedExpiry = undefined;

            await user.save();
            return NextResponse.json({message: "Email verified successfully", success: true});
        }
    } catch (error: any) {
        console.log("Some error has occured");
        return NextResponse.json({error: error.message}, {status: 500});
    }
}