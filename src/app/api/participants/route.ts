import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required", status: 400 });
  }

  const participants = await prisma.sessionRecord.findMany({
    where: {
      eventId: Number(eventId),
    },
    distinct: ["name"],
  });

  return NextResponse.json(participants.length);
}
