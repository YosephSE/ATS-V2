import { NextRequest } from "next/server";
import { connectDB } from "@/lib/server/db";
import { errorResponse, json } from "@/lib/server/responses";
import { verifyAuthToken } from "@/lib/server/auth";
import Candidate from "@/lib/server/models/candidate";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { token } = await request.json();

    if (!token) {
      return json({ loggedIn: false });
    }

    try {
      const decoded = verifyAuthToken(token);
      const candidate = await Candidate.findById(decoded._id);

      return json({
        id: candidate?._id,
        role: "user",
        name: candidate?.firstName,
        email: candidate?.email,
      });
    } catch {
      return json({ loggedIn: false });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
