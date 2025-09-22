import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  try {
    const session = await prisma.sessionRecord.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        media: true,
      },
    });
    return NextResponse.json(session);
  } catch (error) {
    console.log("[Server error]", error);
    return NextResponse.error();
  }
}
