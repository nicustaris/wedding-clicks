import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("req>>>>>>>>>", req);
  return NextResponse.json({ message: "ok" });
}
