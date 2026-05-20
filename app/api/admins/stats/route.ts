import { connectDB } from "@/lib/server/db";
import { errorResponse, json } from "@/lib/server/responses";
import Application from "@/lib/server/models/application";
import Candidate from "@/lib/server/models/candidate";
import Job from "@/lib/server/models/job";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const [
      totalApplications,
      totalJobs,
      totalCandidates,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      activeJobs,
      inactiveJobs,
    ] = await Promise.all([
      Application.countDocuments(),
      Job.countDocuments(),
      Candidate.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Application.countDocuments({ status: "approved" }),
      Application.countDocuments({ status: "rejected" }),
      Job.countDocuments({ status: true }),
      Job.countDocuments({ status: false }),
    ]);

    return json({
      totalApplications,
      totalJobs,
      totalCandidates,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      activeJobs,
      inactiveJobs,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
