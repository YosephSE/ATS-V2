import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireUser } from "@/lib/server/auth";
import { errorResponse, json, notFoundError } from "@/lib/server/responses";
import Candidate from "@/lib/server/models/candidate";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    const candidate = await Candidate.findById(user._id).select("-password");

    if (!candidate) {
      throw notFoundError();
    }

    return json(candidate);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(user._id, body, {
      new: true,
    }).select("-password");

    if (!updatedCandidate) {
      throw notFoundError();
    }

    return json(updatedCandidate);
  } catch (error) {
    return errorResponse(error);
  }
}
