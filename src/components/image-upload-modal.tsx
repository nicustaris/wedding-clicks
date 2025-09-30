"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useParams } from "next/navigation";
import { Api } from "@/services/api-client";
import { useMediaStore } from "@/store/media";

interface Props {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const imageUploadSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name",
  }),
  message: z.string().optional(),
  files: z
    .any()
    .refine((files) => files?.length > 0, "Please upload at least one image"),
});

type imageUploadValues = z.infer<typeof imageUploadSchema>;

const ImageUploadModal: React.FC<Props> = ({ open, onClose, className }) => {
  const { eventId } = useParams();
  const { fetchMedia } = useMediaStore();

  const form = useForm({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      name: "",
      message: "",
      files: null,
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const handleClose = () => {
    onClose();
  };

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
      await Api.upload.mediaUpload(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchMedia();
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 mt-2"
        >
          <Input {...register("name")} name="name" placeholder="Your name" />
          {errors.name && (
            <span className="text-red-400 text-sm mb-3 ml-1">
              {errors.name.message}
            </span>
          )}
          <Textarea
            {...register("message")}
            name="message"
            placeholder="Message"
          />
          {errors.message && (
            <span className="text-red-400 text-sm mb-3 ml-1">
              {errors.message?.message}
            </span>
          )}
          <Input
            {...register("files")}
            type="file"
            name="files"
            accept="image/*,video/*"
            multiple
          />
          {errors.files && (
            <span className="text-red-400 text-sm mb-3 ml-1">
              {errors.files.message as string}
            </span>
          )}

          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            // disabled={!isValid}
          >
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
