import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error: "User does not exists."}, {status: 404});
        }
        console.log(user);
        const isPasswordVaild = await bcryptjs.compare(password, user.password)
        if(!isPasswordVaild) {
            return NextResponse.json({error: "Invalid Credentials ..."}, {status: 500});
        }      
        const jwtTokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const jwtToken = jwt.sign(jwtTokenData, process.env.TOKEN_STRING!, {expiresIn: '1d'});

        const response = NextResponse.json({message: "User Logged in successfully !!", success: true})

        response.cookies.set("token", jwtToken, {httpOnly: true});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}