import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "./ui/dialog";
import { SessionWithMedia } from "../../@types/prisma";
import Image from "next/image";
import { Media } from "../../@types/media";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedMedia: Media;
  className?: string;
}

const ImageViewModal: React.FC<Props> = ({
  open,
  onClose,
  selectedMedia,
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
          <Image
            src={selectedMedia.imageUrl}
            alt={selectedMedia.mediaType}
            fill
            className="object-contain rounded"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal;
