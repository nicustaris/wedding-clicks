"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaStore } from "@/store/media";
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
        {session.flatMap((s) =>
          s.media.map((m) => (
            <figure key={s.id} className="relative w-full aspect-square">
              <Image
                src={m.imageUrl}
                alt={s.name || "Image"}
                className="object-cover object-center"
                fill
              />
              <figcaption className="w-full absolute bottom-0 right-0 bg-gray-500/45 text-end">
                <span className="text-foreground text-[10px] px-2 md:text-[14px]">
                  {s.name}
                </span>
              </figcaption>
            </figure>
          ))
        )}
      </div>
    </section>
  );
};

export default WeddingAlbum;
