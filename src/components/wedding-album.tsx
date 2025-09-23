"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaStore } from "@/store/media";
import { Skeleton } from "./ui/skeleton";
interface Props {
  className?: string;
}

const WeddingAlbum: React.FC<Props> = ({ className }) => {
  const { session, loading, error, fetchMedia } = useMediaStore();

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

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
          : session.map((session) => {
              const firstMedia = session.media[0];

              if (!firstMedia) return null;
              return (
                <figure
                  key={session.id}
                  className="relative w-full aspect-square"
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
    </section>
  );
};

export default WeddingAlbum;
