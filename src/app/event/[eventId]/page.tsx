export const dynamic = "force-dynamic";

import React from "react";

import { EventStats } from "@/components/event-stats";
import { WeddingAlbum } from "@/components/wedding-album";

interface PageParams {
  params: Promise<{ eventId: string }>;
}

const Page = async ({ params }: PageParams) => {
  const { eventId } = await params;

  return (
    <div className="w-full">
      <div
        className="relative flex flex-col justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url(/event-bg.jpeg)", height: "35vh" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div>
          <div className="flex flex-col absolute top-1/3">
            <h1 className="text-2xl italic font-allura">Nicu & Doina</h1>
            <span className="text-2xl font-allura">Wedding</span>
          </div>
          <EventStats />
        </div>
      </div>
      <WeddingAlbum eventId={Number(eventId)} />
    </div>
  );
};

export default Page;
