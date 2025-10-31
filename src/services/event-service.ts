import { prisma } from "../../prisma/prisma-client";

export async function getEventStats(eventId: number) {
  // Get the total number of participants.
  const uniqueParticipants = await prisma.sessionRecord.groupBy({
    by: ["name"],
    where: {
      eventId: eventId,
      media: {
        some: {},
      },
    },
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
    participantsCount: uniqueParticipants,
    mediaCount: totalMedia,
  };
}
