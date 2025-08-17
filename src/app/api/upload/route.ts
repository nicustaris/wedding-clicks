import { NextResponse } from "next/server";
import BackblazeB2 from "backblaze-b2";

const b2 = new BackblazeB2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_APP_KEY!,
});

export async function GET() {
  try {
    await b2.authorize();

    const { data: uploadData } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID!,
    });

    return NextResponse.json(uploadData);
  } catch (err) {
    console.error("B2 get-upload-url error:", err);
    return NextResponse.json(
      { error: "Failed to get upload URL" },
      { status: 500 }
    );
  }
}
