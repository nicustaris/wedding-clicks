import { NextRequest, NextResponse } from "next/server";
import BackblazeB2 from "backblaze-b2";
import { randomUUID } from "crypto";
import { prisma } from "../../../../prisma/prisma-client";

const b2 = new BackblazeB2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_APP_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    await b2.authorize();

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const eventIdStr = formData.get("eventId") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string | null;

    if (!eventIdStr) {
      return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const eventId = Number(eventIdStr);

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const { data: uploadData } = await b2.getUploadUrl({
          bucketId: process.env.B2_BUCKET_ID!,
        });

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const originalName = file.name;
        const extension = originalName.includes(".")
          ? originalName.substring(originalName.lastIndexOf("."))
          : "";
        const uniqueName = `${Date.now()}-${randomUUID()}${extension}`;

        await b2.uploadFile({
          uploadUrl: uploadData.uploadUrl,
          uploadAuthToken: uploadData.authorizationToken,
          fileName: uniqueName,
          data: buffer,
        });

        const publicUrl = `https://f003.backblazeb2.com/file/${
          process.env.B2_BUCKET_NAME
        }/${encodeURIComponent(uniqueName)}`;

        await prisma.media.create({
          data: {
            eventId,
            name,
            message,
            imageUrl: publicUrl,
            mediaType: "photo",
          },
        });

        return {
          fileName: uniqueName,
          url: publicUrl,
        };
      })
    );

    return NextResponse.json({ files: uploadResults });
  } catch (error) {
    console.error("[UPLOAD] Server error:", error);
    return NextResponse.json(
      { error: (error as any)?.message || "Server error" },
      { status: 500 }
    );
  }
}
