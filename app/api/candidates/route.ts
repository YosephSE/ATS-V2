import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireRole, requireUser } from "@/lib/server/auth";
import { errorResponse, json } from "@/lib/server/responses";
import Candidate from "@/lib/server/models/candidate";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    requireRole(user, ["admin", "super admin"]);

    const candidates = await Candidate.find();
    return json(candidates);
  } catch (error) {
    return errorResponse(error);
  }
}
