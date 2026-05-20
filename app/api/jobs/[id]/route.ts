import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireRole, requireUser } from "@/lib/server/auth";
import { errorResponse, json, notFoundError } from "@/lib/server/responses";
import Job from "@/lib/server/models/job";
import "@/lib/server/models/admin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;
    const job = await Job.findById(id).populate(
      "postedBy",
      "firstName lastName email"
    );

    if (!job) {
      throw notFoundError();
    }

    return json(job);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
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

    const { id } = await context.params;
    const updatedJob = await Job.findByIdAndUpdate(id, body, { new: true });

    if (!updatedJob) {
      throw notFoundError();
    }

    return json({ message: "Job updated successfully" }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
