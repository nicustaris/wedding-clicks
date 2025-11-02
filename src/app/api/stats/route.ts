import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required", status: 400 });
  }

  try {
    // Get the total number of participants.
    const uniqueParticipants = await prisma.sessionRecord.findMany({
      where: {
        eventId: parseInt(eventId),
        media: {
          some: {},
        },
      },
      distinct: ["name"],
    });

    // Get total media count from Media table.
    const totalMedia = await prisma.media.count({
      where: {
        sessionRecord: {
          eventId: parseInt(eventId),
        },
      },
    });

    return NextResponse.json({
      participantsCount: uniqueParticipants.length,
      mediaCount: totalMedia,
    });
  } catch (error) {
    console.log(error);
  }
}
