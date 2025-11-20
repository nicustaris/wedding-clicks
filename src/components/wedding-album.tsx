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
  const { media, loading, fetchMedia, error } = useMediaStore();
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchMedia(eventId);
  }, [eventId]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 + media.length) % media.length : 0
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % media.length : 0));
  };

  return (
    <section className={cn("bg-white text-background p-1", className)}>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-1">
        {loading
          ? Array.from({ length: 12 }, (_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full aspect-square bg-gray-200 mt-0.5 animate-pulse"
              />
            ))
          : media.map((item, index) => (
              <figure
                key={item.id}
                className="relative w-full aspect-square cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index);
                  setOpenImageModal(true);
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.mediaType || "Image"}
                  className="object-cover object-center rounded"
                  fill
                  unoptimized
                />
                <figcaption className="w-full absolute bottom-0 right-0 bg-gray-500/45 text-end">
                  <span className="text-foreground text-[10px] px-2 md:text-[14px]">
                    {item.mediaType}
                  </span>
                </figcaption>
              </figure>
            ))}
      </div>

      {/* View image modal */}
      {openImageModal && currentIndex !== null && (
        <ImageViewModal
          open={openImageModal}
          onClose={() => setOpenImageModal(false)}
          selectedMedia={media[currentIndex]}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
};
