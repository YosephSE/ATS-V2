import { NextResponse } from "next/server";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(error: unknown) {
  const err = error as any;

  console.error(err);

  if (err.name === "ValidationError") {
    return json(
      {
        message: "Validation Error",
        errors: err.errors,
      },
      400
    );
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return json({ message: "Invalid ID format" }, 400);
  }

  if (err.status === 404) {
    return json({ message: "Resource not found" }, 404);
  }

  if (err.name === "UnauthorizedError") {
    return json({ message: "Unauthorized access" }, 401);
  }

  if (err.name === "TokenExpiredError") {
    return json({ message: "Token has expired, please login again" }, 401);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return json({ message: `Duplicate value for field: ${field}` }, 409);
  }

  if (
    err.errors &&
    Object.values(err.errors).some((value: any) => value.kind === "required")
  ) {
    return json(
      {
        message: "Missing required fields",
        errors: err.errors,
      },
      400
    );
  }

  if (err.status) {
    return json({ message: err.message || "Request failed" }, err.status);
  }

  return json(
    {
      message: "Internal Server Error",
      error: err.message,
    },
    500
  );
}

export function notFoundError() {
  const error = new Error();
  (error as any).status = 404;
  return error;
}
