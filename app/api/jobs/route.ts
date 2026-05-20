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

    const searchParams = request.nextUrl.searchParams;
    const filter: any = {};
    const fields = [
      "title",
      "location",
      "department",
      "type",
      "status",
      "postedBy",
      "createdAt",
    ];

    for (const field of fields) {
      const value = searchParams.get(field);
      if (value !== null && value !== "") {
        filter[field] = field === "status" ? value === "true" : value;
      }
    }

    const description = searchParams.get("description");
    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }

    const minSalary = searchParams.get("minSalary");
    const maxSalary = searchParams.get("maxSalary");
    if (minSalary || maxSalary) {
      filter.minSalary = { $lte: maxSalary ? Number(maxSalary) : 9000000000000 };
      filter.maxSalary = { $gte: minSalary ? Number(minSalary) : 0 };
    }

    const jobs = await Job.find(filter)
      .populate("postedBy", "firstName lastName email")
      .sort({ createdAt: -1 });

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

    return json(jobsWithApplicationCount);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = requireUser(request);
    requireRole(user, ["admin", "super admin"]);

    const body = await request.json();
    const job = new Job({
      ...body,
      postedBy: user._id,
    });
    const savedJob = await job.save();

    return json(savedJob, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
