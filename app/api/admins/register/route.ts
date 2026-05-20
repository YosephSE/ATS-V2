import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { errorResponse, json } from "@/lib/server/responses";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { firstName, lastName, email, phoneNumber } = await request.json();
    const userExists = await Admin.findOne({ email });

    if (userExists) {
      const error = new Error("User already exists");
      (error as any).status = 400;
      throw error;
    }

    const user = await Admin.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: "",
      role: "admin",
      approved: false,
    });

    return json(
      {
        _id: user._id,
        name: user.firstName,
        email: user.email,
        role: user.role,
        message: "Request sent to super admin for approval",
      },
      201
    );
  } catch (error) {
    return errorResponse(error);
  }
}
