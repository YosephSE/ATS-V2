import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export type AuthUser = {
  _id: string;
  role: string;
};

const maxAge = 30 * 24 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new Error("SECRET_KEY is not configured");
  }

  return secret;
}

function isProduction() {
  return process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";
}

export function signAuthToken(user: { _id: unknown; role?: string }) {
  return jwt.sign(
    {
      _id: String(user._id),
      role: user.role || "user",
    },
    getSecret(),
    {
      expiresIn: "30d",
    }
  );
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set("auth", token, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    maxAge: maxAge / 1000,
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set("auth", "", {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, getSecret()) as AuthUser;
}

export function requireUser(request: NextRequest) {
  const token = request.cookies.get("auth")?.value;

  if (!token) {
    const error = new Error("Access denied");
    (error as any).status = 403;
    throw error;
  }

  try {
    return verifyAuthToken(token);
  } catch {
    const error = new Error("Invalid token");
    (error as any).status = 401;
    throw error;
  }
}

export function requireRole(user: AuthUser, allowedRoles: string[]) {
  if (!allowedRoles.includes(user.role)) {
    const error = new Error("You do not have permission to access this resource.");
    (error as any).status = 403;
    throw error;
  }
}
