import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { setAuthCookie, signAuthToken } from "@/lib/server/auth";
import { errorResponse } from "@/lib/server/responses";
import Candidate from "@/lib/server/models/candidate";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await request.json();
    const userExists = await Candidate.findOne({ email });

    if (userExists) {
      const error = new Error("User already exists");
      (error as any).status = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Candidate.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = signAuthToken(user);
    const response = NextResponse.json(
      {
        _id: user._id,
        name: user.firstName,
        email: user.email,
        role: "user",
        token,
      },
      { status: 201 }
    );

    setAuthCookie(response, token);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
