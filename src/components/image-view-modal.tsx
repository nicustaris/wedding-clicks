import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { SessionWithMedia } from "../../@types/prisma";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  session?: SessionWithMedia;
  className?: string;
}

const ImageViewModal: React.FC<Props> = ({
  open,
  onClose,
  session,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!session || session.media.length === 0) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "flex flex-col w-full h-screen max-w-none rounded-none p-4 bg-white text-background overflow-auto",
          className
        )}
      >
        <DialogTitle className="absolute top-0 left-0 z-50 p-2 text-black">
          {/* {session?.message} */}
        </DialogTitle>

        {/* Main Image */}
        <div className="relative flex-1 w-full max-w-3xl mx-auto mb-4">
          <Image
            src={session.media[selectedIndex].imageUrl}
            alt={session.message || ""}
            fill
            className="object-contain rounded"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto px-2">
          {session.media.length > 1 &&
            session.media.map((media, index) => (
              <div
                key={media.id}
                className={cn(
                  "relative w-24 h-24 flex-shrink-0 cursor-pointer border",
                  index === selectedIndex
                    ? "border-blue-500"
                    : "border-gray-300"
                )}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={media.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal;
