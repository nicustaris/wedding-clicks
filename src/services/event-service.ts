export const dynamic = "force-dynamic";

import { prisma } from "../../prisma/prisma-client";

export async function getEventStats(eventId: number) {
  // Get the total number of participants.
  const uniqueParticipants = await prisma.sessionRecord.findMany({
    where: {
      eventId: eventId,
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
        eventId: eventId,
      },
    },
  });

  return {
    participantsCount: uniqueParticipants.length,
    mediaCount: totalMedia,
  };
}
