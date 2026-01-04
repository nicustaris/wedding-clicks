import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi, UTFile } from "uploadthing/server";
import z from "zod";
import { prisma } from "../../../../prisma/prisma-client";
import { generateImageVariants } from "@/lib/generateImageVariants";
import { uploadVariants } from "@/lib/uploadVariants";

const f = createUploadthing();
export const utapi = new UTApi({
  token: process.env.UPLOADTHING_SCRET,
});

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
      // Fallback to original file
      let optimizedUrl = file.ufsUrl;
      let thumbnailUrl = file.ufsUrl;

      // Generate reduced image for UI optisimation
      if (file.type.startsWith("image/")) {
        // Download original file from UploadThing URL
        const response = await fetch(file.ufsUrl);
        const buffer = Buffer.from(await response.arrayBuffer());
        const variants = await generateImageVariants(buffer);
        const urls = await uploadVariants(utapi, file.key, variants);
        optimizedUrl = urls.optimized ?? optimizedUrl;
        thumbnailUrl = urls.thumbnail ?? thumbnailUrl;
      }

      // Save media record in DB
      const media = await prisma.media.create({
        data: {
          sessionId: metadata.sessionId,
          url: file.ufsUrl,
          optimizedUrl: optimizedUrl,
          thumbnailUrl: thumbnailUrl,
          mediaType: file.type || "image",
        },
      });
      return {
        id: media.id,
        sessionId: media.sessionId,
        url: media.url,
        optimizedUrl: media.optimizedUrl,
        thumbnailUrl: media.thumbnailUrl,
        mediaType: media.mediaType,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
