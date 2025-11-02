"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaStore } from "@/store/media";
import { Skeleton } from "./ui/skeleton";
import ImageViewModal from "./image-view-modal";
interface Props {
  eventId: number;
  className?: string;
}

export const WeddingAlbum: React.FC<Props> = ({ eventId, className }) => {
  const { sessions, loading, setEventId, fetchMedia, error } = useMediaStore();
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    setEventId(eventId);
    fetchMedia();
  }, [eventId]);

  const selectedSession = selectedSessionId
    ? sessions.find((s) => s.id === selectedSessionId)
    : null;

  return (
    <section className={cn("bg-white text-background p-1", className)}>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-2">
        {loading
          ? Array.from({ length: 9 }, (_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full aspect-square bg-gray-200 mt-0.5"
              />
            ))
          : sessions.map((session) => {
              const firstMedia = session.media[0];

              if (!firstMedia) return null;
              return (
                <figure
                  key={session.id}
                  className="relative w-full aspect-square cursor-pointer"
                  onClick={() => {
                    setSelectedSessionId(session.id);
                    setOpenImageModal(true);
                  }}
                >
                  <Image
                    src={firstMedia.imageUrl}
                    alt={session.name || "Image"}
                    className="object-cover object-center"
                    fill
                  />
                  <figcaption className="w-full absolute bottom-0 right-0 bg-gray-500/45 text-end">
                    <span className="text-foreground text-[10px] px-2 md:text-[14px]">
                      {session.name}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
      </div>

      {/* Image view modal */}
      {openImageModal && (
        <ImageViewModal
          open={openImageModal}
          onClose={() => setOpenImageModal(false)}
          session={selectedSession!}
        />
      )}
    </section>
  );
};
