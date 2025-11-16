import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { Media } from "../../@types/media";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  selectedMedia: Media;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  direction: "left" | "right";
  className?: string;
}

const ImageViewModal: React.FC<Props> = ({
  open,
  selectedMedia,
  onPrev,
  onNext,
  onClose,
  direction,
  className,
}) => {
  if (!selectedMedia) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "flex flex-col w-full h-screen max-h-dvh max-w-none rounded-none p-4 text-background overflow-auto bg-black/40",
          className
        )}
      >
        <DialogTitle className="absolute top-0 left-0 p-2 text-black">
          {/* {session?.message} */}
        </DialogTitle>

        {/* Main Image */}
        <div className="relative flex-1 w-full max-w-3xl mx-auto mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMedia.id}
              initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={selectedMedia.imageUrl}
                alt={selectedMedia.mediaType}
                fill
                className="object-contain rounded"
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between absolute inset-0 px-1">
            <FaChevronLeft onClick={onPrev} className="size-10 text-gray-400" />
            <FaChevronRight
              onClick={onNext}
              className="size-10 text-gray-400"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal;
