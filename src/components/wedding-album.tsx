"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaStore } from "@/store/media";
import { Skeleton } from "./ui/skeleton";
import ImageViewModal from "./image-view-modal";

// React icons
import { RiGalleryView2 } from "react-icons/ri";
import { FaVideo } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { useFavorites } from "@/hooks/useFavorites";

interface Props {
  eventId: number;
  className?: string;
}

export const WeddingAlbum: React.FC<Props> = ({ eventId, className }) => {
  const { media, loading, fetchMedia, error } = useMediaStore();
  const { favorites, toggleFavorite, isFavorite } = useFavorites(eventId);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "gallery" | "videos" | "favorites"
  >("gallery");

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

  const tabs = [
    {
      id: "gallery",
      icon: <RiGalleryView2 size={25} />,
    },
    {
      id: "videos",
      icon: <FaVideo size={25} />,
    },
    {
      id: "favorites",
      icon: <GoHeartFill size={25} />,
    },
  ] as const;

  return (
    <section className={cn("bg-white text-background p-1.5", className)}>
      <div className="flex justify-evenly p-2 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex relative flex-col items-center p-3"
            >
              {/* Icon */}
              <span>
                {React.cloneElement(tab.icon, {
                  className: cn(
                    isActive ? "text-secondary" : "text-gray-600",
                    "transition-all"
                  ),
                })}
              </span>

              <span
                className={cn(
                  "absolute bottom-0 h-0.5 w-16 rounded-full bg-primary transition-all",
                  isActive ? "bg-secondary" : "bg-transparent"
                )}
              ></span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-1.5 mt-3">
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
                className="flex relative w-full aspect-square cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index);
                  setOpenImageModal(true);
                }}
              >
                {item.mediaType.startsWith("video/") ? (
                  <>
                    <video
                      playsInline
                      muted
                      src={item.imageUrl}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={item.imageUrl}
                      alt={item.mediaType || "Image"}
                      className="w-full object-cover object-center rounded-md"
                      fill
                    />
                  </>
                )}

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute top-0 right-0 p-1.5"
                >
                  <GoHeartFill
                    size={20}
                    className={cn(
                      "transition-all duration-300",
                      isFavorite(item.id) ? "text-red-500" : "text-gray-100"
                    )}
                  />
                </span>

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
