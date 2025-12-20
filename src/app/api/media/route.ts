import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required", status: 400 });
  }

  try {
    const media = await prisma.media.findMany({
      where: {
        sessionRecord: {
          eventId: Number(eventId),
        },
      },
      select: {
        id: true,
        sessionId: true,
        imageUrl: true,
        mediaType: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalParticipants = await prisma.sessionRecord.findMany({
      where: {
        eventId: Number(eventId),
      },
      include: {
        media: true,
      },
      distinct: ["name"],
    });

    return NextResponse.json({
      media,
      totalParticipants: totalParticipants.length,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media", status: 400 });
  }
}
