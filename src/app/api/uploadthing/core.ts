import { createUploadthing, type FileRouter } from "uploadthing/next";
import z from "zod";
import { prisma } from "../../../../prisma/prisma-client";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 99 },
    video: { maxFileSize: "1GB", maxFileCount: 99 },
  })
    .input(
      z.object({
        name: z.string(),
        message: z.string().optional(),
        eventId: z.number(),
      })
    )
    .middleware(async ({ input }) => {
      // Initialize User Session Record
      try {
        const session = await prisma.sessionRecord.create({
          data: {
            name: input.name,
            message: input.message || "",
            eventId: input.eventId,
          },
        });

        return {
          sessionId: session.id,
        };
      } catch (error) {
        console.log("middleware error", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      // TODO: In the future upload thumbnail for photos to optimise UI
      const media = await prisma.media.create({
        data: {
          sessionId: metadata.sessionId,
          imageUrl: file.ufsUrl,
          mediaType: file.type || "image",
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
