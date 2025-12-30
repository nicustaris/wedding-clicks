import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import { MediaDTO } from "../../@types/media";
import { MdOutlineClose, MdOutlineFileDownload } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { generateRandomFileName } from "@/lib/generateRandomFileName";
import { toast } from "sonner";

interface Props {
  open: boolean;
  mediaList: MediaDTO[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onClose: () => void;
  className?: string;
}

const ImageViewModal: React.FC<Props> = ({
  open,
  mediaList,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();

    emblaApi.scrollTo(currentIndex);

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, currentIndex, mediaList, setCurrentIndex]);

  const handleDownload = async () => {
    if (currentIndex === null) return;

    const media = mediaList[currentIndex];
    if (!media) return;

    // TODO: Make another lib/utils that will handle video format and file name
    const url = media.imageUrl;
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
    const test = "test";
    try {
      const response = await fetch(test);
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
  // TODO: COMMON VARIABLE FOR SAME COLOR USED MULTIPLE TIMES

  return (
    <div className="flex fixed inset-0 justify-center items-center bg-black">
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 bg-[#2727275e] p-2.5 rounded-full z-20 cursor-pointer"
      >
        <MdOutlineClose size={25} className="text-white" />
      </button>
      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 bg-[#2727275e] p-2.5 rounded-full z-20 cursor-pointer"
      >
        <MdOutlineFileDownload size={25} className="text-white" />
      </button>

      <button
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        className="absolute top-1/2 -translate-y-1/2 left-2 bg-[#2727275e] p-2.5 rounded-full z-20 cursor-pointer"
      >
        <FaChevronLeft size={20} className="text-white" />
      </button>
      <button
        onClick={() => emblaApi && emblaApi.scrollNext()}
        className="absolute top-1/2 -translate-y-1/2 right-2 bg-[#2727275e] p-2.5 rounded-full z-20 cursor-pointer"
      >
        <FaChevronRight size={20} className="text-white" />
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
                  src={media.imageUrl}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[95vh] object-contain"
                />
              ) : (
                <Image
                  src={media.imageUrl}
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
