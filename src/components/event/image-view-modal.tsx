import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import { MediaDTO } from "../../@types/media";
import { MdOutlineClose, MdOutlineFileDownload } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { generateRandomFileName } from "@/lib/generateRandomFileName";
import { toast } from "sonner";
import { FaRegHeart } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { GoHeartFill } from "react-icons/go";

interface Props {
  open: boolean;
  mediaList: MediaDTO[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  toggleFavorite: (itemId: number) => void;
  isFavorite: (itemId: number) => boolean;
  onClose: () => void;
  className?: string;
}

const ImageViewModal: React.FC<Props> = ({
  open,
  mediaList,
  currentIndex,
  setCurrentIndex,
  toggleFavorite,
  isFavorite,
  onClose,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: currentIndex ?? 0,
  });

  const prevIndexRef = React.useRef<number | null>(null);
  const currentMedia = mediaList[currentIndex];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // Sync carousel and currentIndex
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(currentIndex);

    const onSelect = () => {
      // Current and previous slide indexes
      const activeIndex = emblaApi.selectedScrollSnap();
      const prevIndex = prevIndexRef.current;
      const slides = emblaApi.slideNodes();

      // Stop video on previous slide
      if (prevIndex !== null && prevIndex !== activeIndex) {
        const prevVideo =
          slides[prevIndex]?.querySelector<HTMLVideoElement>("video");
        if (prevVideo) {
          console.log("PAUSE VIDEO", prevIndex, activeIndex);
          prevVideo.pause();
          prevVideo.currentTime = 0;
          prevVideo.load();
        }
      }

      setCurrentIndex(activeIndex); // Update currentIndex state
      prevIndexRef.current = activeIndex; // Update previous index ref
    };
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, mediaList]);

  const handleDownload = async () => {
    if (currentIndex === null) return;

    const media = mediaList[currentIndex];
    if (!media) return;

    const url = media.url;
    let extension = "file";

    if (media.mediaType.startsWith("image/")) {
      extension = media.mediaType.split("/")[1];
    } else if (media.mediaType.startsWith("video/")) {
      const type = media.mediaType.split("/")[1];
      // Normalize QuickTime/MOV videos to MP4 for universal compatibility
      if (type === "quicktime" || "mov") {
        extension = "mp4";
      } else {
        extension = type;
      }
    }

    const fileName = generateRandomFileName(extension);
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release memory
      URL.revokeObjectURL(blobUrl);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Download failed", {
          description: error.message || String(error),
        });
      } else {
        toast.error("Download failed", {
          description: String(error),
        });
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="flex fixed inset-0 justify-center items-center bg-black">
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 bg-overlay p-2.5 rounded-full z-20 cursor-pointer"
      >
        <MdOutlineClose size={25} className="text-white" />
      </button>
      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 bg-overlay p-2.5 rounded-full z-20 cursor-pointer"
      >
        <MdOutlineFileDownload size={25} className="text-white" />
      </button>

      <button
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        className="absolute top-1/2 -translate-y-1/2 left-2 bg-overlay p-2.5 rounded-full z-20 cursor-pointer"
      >
        <FaChevronLeft size={20} className="text-white" />
      </button>
      <button
        onClick={() => emblaApi && emblaApi.scrollNext()}
        className="absolute top-1/2 -translate-y-1/2 right-2 bg-overlay p-2.5 rounded-full z-20 cursor-pointer"
      >
        <FaChevronRight size={20} className="text-white" />
      </button>

      <button
        onClick={() => {
          if (!currentMedia) return;
          toggleFavorite(currentMedia.id);
        }}
        className="flex items-center justify-center gap-2 absolute bottom-3 right-3 bg-overlay px-3 py-1.5 rounded-full cursor-pointer z-20"
      >
        <GoHeartFill
          size={21}
          className={cn(
            "transition-all duration-300",
            isFavorite(currentMedia.id) ? "text-red-500" : "text-white"
          )}
        />
        <span className={"text-white text-sm"}>Favorite</span>
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {mediaList.map((media, index) => (
            <div
              key={index}
              className="flex-none w-full flex items-center justify-center relative"
            >
              {media.mediaType.startsWith("video/") ? (
                <video
                  data-video={index}
                  src={media.url}
                  controls
                  playsInline
                  className="max-w-full max-h-[95vh] object-contain"
                />
              ) : (
                <Image
                  src={media.optimizedUrl}
                  alt={media.mediaType}
                  width={800}
                  height={600}
                  className="object-contain max-w-full max-h-[95vh]"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewModal;
