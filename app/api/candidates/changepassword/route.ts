import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireUser } from "@/lib/server/auth";
import { errorResponse, json } from "@/lib/server/responses";
import Candidate from "@/lib/server/models/candidate";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    const { oldPassword, newPassword } = await request.json();
    const candidate = await Candidate.findById(user._id);

    if (!candidate) {
      return json({ message: "Candidate not found" }, 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, candidate.password);
    if (!isMatch) {
      return json({ message: "Invalid old password" }, 401);
    }

    const salt = await bcrypt.genSalt(10);
    candidate.password = await bcrypt.hash(newPassword, salt);
    await candidate.save();

    return json({ message: "Password changed successfully" });
  } catch (error) {
    return errorResponse(error);
  }
}
