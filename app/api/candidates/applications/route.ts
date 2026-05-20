import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireUser } from "@/lib/server/auth";
import { errorResponse, json } from "@/lib/server/responses";
import Application from "@/lib/server/models/application";
import Candidate from "@/lib/server/models/candidate";
import Job from "@/lib/server/models/job";
import applicationScore from "@/lib/server/applicationScore";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    const applications = await Application.find({
      candidateId: user._id,
    }).populate({ path: "jobId" });

    return json(applications);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    const { jobId } = await request.json();
    const jobDetails = await Job.findById(jobId);
    const candidateDetails = await Candidate.findById(user._id);
    const score = await applicationScore({
      job: jobDetails,
      candidate: candidateDetails,
    });

    const applicationExists = await Application.findOne({
      jobId,
      candidateId: user._id,
    });

    if (applicationExists) {
      const error = new Error("Application already exists");
      (error as any).status = 400;
      throw error;
    }

    const application = new Application({
      jobId,
      candidateId: user._id,
      status: "pending",
      AIScore: score,
    });

    await application.save();

    return json({ message: "Application created successfully" }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
