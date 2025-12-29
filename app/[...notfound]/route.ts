import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return new NextResponse(`Cannot GET ${req.nextUrl.pathname}`, {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
  });
}

export async function POST(req: NextRequest) {
  return new NextResponse(`Cannot POST ${req.nextUrl.pathname}`, {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
  });
}
