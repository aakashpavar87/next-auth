import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connectDB()

// logout karva maate only token clean karvu pade
export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({message: "User Logout successfully", success: true})
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}