import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireRole, requireUser } from "@/lib/server/auth";
import { errorResponse, json, notFoundError } from "@/lib/server/responses";
import Candidate from "@/lib/server/models/candidate";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const user = requireUser(request);
    requireRole(user, ["admin", "super admin"]);

    const { id } = await context.params;
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      throw notFoundError();
    }

    return json(candidate);
  } catch (error) {
    return errorResponse(error);
  }
}
