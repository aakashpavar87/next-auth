import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB()

export async function GET(request: NextRequest) {

}

export async function POST(request: NextRequest) {
    // Get Data from Token
    const userId = await getDataFromToken(request);
    // We can use spaced -fieldName in select method
    const user = await User.findOne({_id: userId}).select("-password");
    console.log(user);
    
    if(!user) {
        return NextResponse.json({error: "USER NOT FOUND"}, {status: 404});
    }
    return NextResponse.json({message: "User Found", success: true});
}