import React from "react";
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
  const handleClose = () => {
    onClose();
  };
  console.log(session);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "fixed w-full h-screen max-w-none rounded-none p-0 bg-white text-background",
          className
        )}
      >
        <DialogTitle>Image title</DialogTitle>
        {session?.media.map((media) => (
          <div className="relative w-full aspect-square">
            <Image
              src={media.imageUrl}
              alt="qqqqqqqqqqqq"
              fill
              className="object-cover object-center rounded"
            />
          </div>
        ))}
        DDDDDD
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal;
