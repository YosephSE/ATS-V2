import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { verifyAuthToken } from "@/lib/server/auth";
import { errorResponse, json } from "@/lib/server/responses";
import Admin from "@/lib/server/models/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return json({ loggedIn: false });
    }

    try {
      await connectDB();

      const decoded = verifyAuthToken(token);
      const admin = await Admin.findById(decoded._id);

      return json({
        id: admin?._id,
        role: admin?.role,
        name: admin?.firstName,
        email: admin?.email,
        firstTime: admin?.firstTime,
      });
    } catch {
      return json({ loggedIn: false });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
