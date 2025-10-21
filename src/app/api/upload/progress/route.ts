import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uploadId = searchParams.get("uploadId");

  if (!uploadId) {
    return NextResponse.json({ error: "Missing uploadId" }, { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const progress = globalThis.uploadProgress?.[uploadId] || null;
        if (progress) {
          controller.enqueue(`data: ${JSON.stringify(progress)}\n\n`);
        }
      }, 500);

      req.signal.onabort = () => {
        clearInterval(interval);
        controller.close();
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
