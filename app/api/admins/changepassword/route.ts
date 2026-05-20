import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireUser } from "@/lib/server/auth";
import { errorResponse, json } from "@/lib/server/responses";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    const { oldPassword, newPassword } = await request.json();
    const admin = await Admin.findById(user._id);

    if (!admin) {
      return json({ message: "Admin not found" }, 404);
    }

    const isMatch = admin.password
      ? await bcrypt.compare(oldPassword, admin.password)
      : false;

    if (!isMatch) {
      return json({ message: "Invalid old password" }, 401);
    }

    if (admin.firstTime) {
      admin.firstTime = false;
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return json({ message: "Password changed successfully" });
  } catch (error) {
    return errorResponse(error);
  }
}
