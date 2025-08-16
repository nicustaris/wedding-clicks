"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useParams } from "next/navigation";

interface Props {
  className?: string;
}

const imageUploadSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name",
  }),
  message: z.string().optional(),
  files: z
    .any()
    .refine((files) => files?.length > 0, "Please upload at teast one image"),
});

type imageUploadValues = z.infer<typeof imageUploadSchema>;

const ImageUploadModal: React.FC<Props> = ({ className }) => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      name: "",
      message: "",
      files: null,
    },
  });

  const onSubmit: SubmitHandler<imageUploadValues> = async (data) => {
    const formData = new FormData();

    if (!eventId || Array.isArray(eventId)) {
      throw new Error("Missing event id");
    }

    formData.append("eventId", eventId);
    formData.append("name", data.name);
    formData.append("message", data.message || "");

    const filesArray = Array.from(data.files as FileList);
    filesArray.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("upload failed");

      const data = await res.json();
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 mt-2"
        >
          <Input
            {...form.register("name")}
            name="name"
            placeholder="Your name"
          />
          <Textarea
            {...form.register("message")}
            name="message"
            placeholder="Message"
          />
          <Input
            {...form.register("files")}
            type="file"
            name="files"
            accept="image/*,video/*"
            multiple
          />

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
