import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Welcome to spluk.app API",
    version: "1.0.0",
    environment: process.env.NODE_ENV === "development" ? "development" : "production",
    serverTime: new Date().toISOString(),
    docs: "https://api.spluk.app/v1", 
  });
}
