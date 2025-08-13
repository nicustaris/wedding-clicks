import { NextRequest, NextResponse } from "next/server";
import BackblazeB2 from "backblaze-b2";
import { randomUUID } from "crypto";

const b2 = new BackblazeB2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_APP_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    await b2.authorize();

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

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

        return {
          fileName: uniqueName,
          url: publicUrl,
        };
      })
    );
    return NextResponse.json({ files: uploadResults });
  } catch (error) {
    console.log("[UPLOAD] Server error");
  }
}
