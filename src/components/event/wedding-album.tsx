"use client";

import React, { act, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaStore } from "@/store/media";
import { Skeleton } from "../ui/skeleton";
import ImageViewModal from "./image-view-modal";

// React icons
import { RiGalleryView2 } from "react-icons/ri";
import { FaVideo } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { useFavorites } from "@/hooks/useFavorites";
import WelcomeModal from "./welcome-modal";
import AnimatedHeart from "./animated-heart";
import FavoriteIcon from "./favorite-icon";

interface Props {
  eventId: number;
  className?: string;
}

export const WeddingAlbum: React.FC<Props> = ({ eventId, className }) => {
  const { media, loading, fetchMedia, error } = useMediaStore();
  const favorites = useFavorites(eventId);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [showHeart, setShowHeart] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "gallery" | "videos" | "favorites"
  >("gallery");

  useEffect(() => {
    fetchMedia(eventId);
  }, [eventId, fetchMedia]);

  useEffect(() => {
    if (!localStorage.getItem("guestName")) setIsWelcomeModalOpen(true);
  }, []);

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

  const filteredMedia = React.useMemo(() => {
    return media.filter((item) => {
      if (activeTab === "videos") return item.mediaType.startsWith("video/");
      if (activeTab === "favorites") return favorites.isFavorite(item.id);
      return true;
    });
  }, [media, activeTab, favorites.isFavorite]);

  const emptyMessages = {
    gallery: "Photos will appear here once they’re uploaded 📸",
    videos: "No videos yet — check back soon 🎥",
    favorites: "You haven’t added any favorites yet ❤️",
  };

  const handleFavoriteAnimate = useCallback(() => setShowHeart(true), []);

  return (
    <section className={cn("bg-white text-background p-1.5", className)}>
      <AnimatedHeart trigger={showHeart} onDone={() => setShowHeart(false)} />
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-1 mt-3">
        {loading ? (
          Array.from({ length: 12 }, (_, i) => (
            <Skeleton key={i} className="w-full h-full aspect-square" />
          ))
        ) : filteredMedia.length === 0 ? (
          <div className="col-span-full flex w-full h-[60vh] justify-center items-center p-6">
            <span className="text-base sm:text-lg text-center text-gray-600">
              {emptyMessages[activeTab]}
            </span>
          </div>
        ) : (
          filteredMedia.map((item, index) => (
            <figure
              key={item.id}
              className="flex relative w-full aspect-square cursor-pointer"
              onClick={() => {
                setCurrentIndex(index);
                setOpenImageModal(true);
              }}
            >
              {item.mediaType.startsWith("video/") ? (
                <div className="flex relative w-full h-full cursor-pointer">
                  <video
                    preload="metadata"
                    src={`${item.url}#t=0.001`}
                    className="w-full h-full object-cover rounded-sm overflow-y-hidden pointer-events-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.mediaType || "Image"}
                    className="w-full object-cover object-center rounded-md"
                    fill
                  />
                </>
              )}

              <FavoriteIcon
                mediaId={item.id}
                isFavorite={favorites.isFavorite}
                toggleFavorite={favorites.toggleFavorite}
                onAnimate={handleFavoriteAnimate}
              />

              <figcaption className="w-full absolute bottom-0 right-0 bg-gray-500/45 text-end">
                <span className="text-foreground text-[10px] px-2 md:text-[14px]">
                  {item.id}
                </span>
              </figcaption>
            </figure>
          ))
        )}
      </div>

      {/* View image modal */}
      {openImageModal && currentIndex !== null && (
        <ImageViewModal
          open={openImageModal}
          mediaList={filteredMedia}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          toggleFavorite={favorites.toggleFavorite}
          isFavorite={favorites.isFavorite}
          onClose={() => setOpenImageModal(false)}
        />
      )}

      {/* Welcome modal */}
      {isWelcomeModalOpen && (
        <WelcomeModal
          isWelcomeModalOpen={isWelcomeModalOpen}
          onClose={() => setIsWelcomeModalOpen(false)}
        />
      )}
    </section>
  );
};
