import React from "react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

const ImageUploadModal: React.FC<Props> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload photo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>title</DialogTitle>
        <DialogDescription>desc</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
