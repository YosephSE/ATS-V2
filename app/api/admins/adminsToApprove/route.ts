import { connectDB } from "@/lib/server/db";
import { errorResponse, json } from "@/lib/server/responses";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const admins = await Admin.find({ approved: false }).select("-password");
    return json(admins);
  } catch (error) {
    return errorResponse(error);
  }
}
