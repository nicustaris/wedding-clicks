"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface Props {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const imageUploadSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  message: z.string().optional(),
  files: z
    .any()
    .refine(
      (files) => files?.length > 0,
      "Please upload at least one file (image or video)"
    ),
});

type imageUploadValues = z.infer<typeof imageUploadSchema>;

const ImageUploadModal: React.FC<Props> = ({ open, onClose, className }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const form = useForm<imageUploadValues>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: { name: "", message: "", files: null },
  });

  const handleClose = () => {
    setProgress(0);
    onClose();
  };

  const onSubmit: SubmitHandler<imageUploadValues> = async (data) => {
    if (!data.files) return;

    setLoading(true);
    const filesArray = Array.from(data.files as FileList);

    for (const file of filesArray) {
      try {
        const res = await fetch("/api/upload");
        const { uploadUrl, authorizationToken } = await res.json();

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          };

          xhr.open("POST", uploadUrl, true);
          xhr.setRequestHeader("Authorization", authorizationToken);
          xhr.setRequestHeader("X-Bz-File-Name", encodeURIComponent(file.name));
          xhr.setRequestHeader("Content-Type", file.type || "b2/x-auto");
          xhr.setRequestHeader("X-Bz-Content-Sha1", "do_not_verify");

          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log("Upload success:", xhr.responseText);
              resolve();
            } else {
              console.error("Upload failed:", xhr.responseText);
              reject(new Error(xhr.responseText));
            }
          };

          xhr.onerror = () => reject(new Error("Upload failed"));
          xhr.send(file);
        });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setLoading(false);
    setProgress(0);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
          <Input {...form.register("name")} placeholder="Your name" />
          <Textarea {...form.register("message")} placeholder="Message" />
          <Input
            {...form.register("files")}
            type="file"
            accept="image/*,video/*"
            multiple
          />

          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
