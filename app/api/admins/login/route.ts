import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { setAuthCookie, signAuthToken } from "@/lib/server/auth";
import { errorResponse } from "@/lib/server/responses";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();
    const user = await Admin.findOne({ email });
    const isMatch = user ? await bcrypt.compare(password, user.password || "") : false;

    if (!user || !isMatch || !user.approved) {
      const error = new Error("Invalid Email or Password");
      (error as any).status = 401;
      throw error;
    }

    const token = signAuthToken(user);
    const response = NextResponse.json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      role: user.role,
      firstTime: user.firstTime,
      token,
    });

    setAuthCookie(response, token);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
