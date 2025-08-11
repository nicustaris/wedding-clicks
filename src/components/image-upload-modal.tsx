"use client";

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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Props {
  className?: string;
}

const ImageUploadModal: React.FC<Props> = ({ className }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload photo</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "w-full max-w-2xl bg-foreground text-background",
          className
        )}
      >
        <DialogTitle>Media upload</DialogTitle>
        <DialogDescription className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-2 mt-2"
          >
            <Input placeholder="Your name" />
            <Textarea placeholder="Description" />
            <Input type="file" accept="image/*,video/*" />
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
