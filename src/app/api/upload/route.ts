import { NextRequest, NextResponse } from "next/server";
import BackblazeB2 from "backblaze-b2";
import { randomUUID } from "crypto";
import { prisma } from "../../../../prisma/prisma-client";

const b2 = new BackblazeB2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_APP_KEY!,
});

// Ensure global progress storage exists
if (!globalThis.uploadProgress) globalThis.uploadProgress = {};

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await b2.authorize();

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const eventIdStr = formData.get("eventId") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string | null;
    const uploadId = (formData.get("uploadId") as string) || randomUUID();

    if (!eventIdStr || files.length === 0) {
      return NextResponse.json(
        { error: "Missing eventId or files" },
        { status: 400 }
      );
    }

    const eventId = Number(eventIdStr);

    // Create session
    const session = await prisma.sessionRecord.create({
      data: { name, message: message || "" },
    });

    // Initialize progress
    globalThis.uploadProgress[uploadId] = {
      currentFileIndex: 0,
      totalFiles: files.length,
      files: files.map((file) => ({ fileName: file.name, percent: 0 })),
    };

    // Upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { data: uploadData } = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID!,
      });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const extension = file.name.includes(".")
        ? file.name.substring(file.name.lastIndexOf("."))
        : "";
      const uniqueName = `${Date.now()}-${randomUUID()}${extension}`;

      // Start at 0% for this file
      globalThis.uploadProgress[uploadId].files[i].percent = 0;

      // Upload via Backblaze SDK
      await b2.uploadFile({
        uploadUrl: uploadData.uploadUrl,
        uploadAuthToken: uploadData.authorizationToken,
        fileName: uniqueName,
        data: buffer,
      });

      // Mark 100% after finished
      globalThis.uploadProgress[uploadId].files[i].percent = 100;
      globalThis.uploadProgress[uploadId].currentFileIndex = i;

      // Save in DB
      const publicUrl = `https://f003.backblazeb2.com/file/${
        process.env.B2_BUCKET_NAME
      }/${encodeURIComponent(uniqueName)}`;
      await prisma.media.create({
        data: {
          eventId,
          sessionId: session.id,
          imageUrl: publicUrl,
          mediaType: "photo",
        },
      });
    }

    return NextResponse.json({ status: 200, uploadId });
  } catch (error) {
    console.error("[UPLOAD] Server error:", error);
    return NextResponse.json(
      { error: (error as any)?.message || "Server error" },
      { status: 500 }
    );
  }
}
