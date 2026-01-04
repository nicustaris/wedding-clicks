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
        url: true,
        optimizedUrl: true,
        thumbnailUrl: true,
        mediaType: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media", status: 400 });
  }
}
