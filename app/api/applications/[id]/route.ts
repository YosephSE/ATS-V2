import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireRole, requireUser } from "@/lib/server/auth";
import { errorResponse, json, notFoundError } from "@/lib/server/responses";
import Application from "@/lib/server/models/application";
import "@/lib/server/models/candidate";
import "@/lib/server/models/job";

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
    const application = await Application.findById(id)
      .populate({ path: "jobId" })
      .populate({ path: "candidateId" });

    if (!application) {
      throw notFoundError();
    }

    return json(application);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    requireUser(request);

    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }

    const { id } = await context.params;
    const updatedApplication = await Application.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedApplication) {
      throw notFoundError();
    }

    const populatedApplication = await Application.findById(id)
      .populate({ path: "jobId" })
      .populate({ path: "candidateId" });

    return json(populatedApplication);
  } catch (error) {
    return errorResponse(error);
  }
}
