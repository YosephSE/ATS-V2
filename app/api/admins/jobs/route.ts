import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { requireRole, requireUser } from "@/lib/server/auth";
import { errorResponse, json } from "@/lib/server/responses";
import Application from "@/lib/server/models/application";
import Job from "@/lib/server/models/job";
import "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    requireRole(user, ["admin", "super admin"]);

    const jobs = await Job.find().populate("postedBy", "firstName lastName email");
    const jobsWithApplicationCount = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({
          jobId: job._id,
        });

        return {
          ...job.toObject(),
          applications: applicationCount,
        };
      })
    );

    return json({ jobs: jobsWithApplicationCount });
  } catch (error) {
    return errorResponse(error);
  }
}
