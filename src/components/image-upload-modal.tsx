"use client";

import React, { useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("upload failed");

      const data = await res.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mt-2">
          <Input name="name" placeholder="Your name" />
          <Textarea name="message" placeholder="Message" />
          <Input type="file" name="files" accept="image/*,video/*" multiple />

          <Button
            type="submit"
            variant="default"
            loading={loading}
            onClick={() => setLoading(true)}
          >
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
