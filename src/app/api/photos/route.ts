import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.error();
  }
}
