import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireRole, requireUser } from "@/lib/server/auth";
import { errorResponse, json, notFoundError } from "@/lib/server/responses";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    requireRole(user, ["admin", "super admin"]);

    const admin = await Admin.findById(user._id).select("-password");
    if (!admin) {
      throw notFoundError();
    }

    return json(admin);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    requireRole(user, ["admin", "super admin"]);

    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(user._id, body, {
      new: true,
    }).select("-password");

    if (!updatedAdmin) {
      throw notFoundError();
    }

    return json(updatedAdmin);
  } catch (error) {
    return errorResponse(error);
  }
}
