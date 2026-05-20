import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { errorResponse, json, notFoundError } from "@/lib/server/responses";
import generatePassword from "@/lib/server/generatePassword";
import sendPasswordEmail from "@/lib/server/mailSender";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      throw notFoundError();
    }

    const password = generatePassword();
    await sendPasswordEmail(admin.email, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.findByIdAndUpdate(id, {
      password: hashedPassword,
      approved: true,
    });

    return json({ message: "Admin approved successfully" });
  } catch (error) {
    return errorResponse(error);
  }
}
