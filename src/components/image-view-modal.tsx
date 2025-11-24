import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { Media } from "../../@types/media";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

interface Props {
  open: boolean;
  selectedMedia: Media;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  className?: string;
}

const ImageViewModal: React.FC<Props> = ({
  open,
  selectedMedia,
  onPrev,
  onNext,
  onClose,
  className,
}) => {
  if (!selectedMedia) return null;

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  const handlePrev = () => {
    setDirection(-1);
    onPrev();
  };

  const handleClose = () => {
    onClose();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "flex flex-col w-full h-screen max-h-dvh max-w-none rounded-none p-4 text-background overflow-auto bg-black/40 overflow-x-hidden",
          className
        )}
      >
        <DialogTitle className="absolute top-0 left-0 p-2 text-black">
          {/* {session?.message} */}
        </DialogTitle>

        {/* Main Image */}
        <div className="relative w-full h-[80vh] overflow-hidden mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedMedia.imageUrl}
              variants={slideVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={selectedMedia.imageUrl}
                alt={selectedMedia.mediaType}
                fill
                sizes="100vw"
                className="object-contain rounded"
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between absolute inset-0 px-1">
            <FaChevronLeft
              onClick={handlePrev}
              className="size-10 text-gray-400"
            />
            <FaChevronRight
              onClick={handleNext}
              className="size-10 text-gray-400"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal;
