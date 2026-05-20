import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "User LoggedOut Successfully" });
  clearAuthCookie(response);
  return response;
}
