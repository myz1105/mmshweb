// app/api/get-ip/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Get the client's IP address from the x-forwarded-for header
  const ip = req.headers.get("x-forwarded-for") || "IP not found";

  return NextResponse.json({ ip });
}
