"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useParams } from "next/navigation";
import { useMediaStore } from "@/store/media";
import { CloudDownload } from "lucide-react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";

import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const uploadSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name",
  }),
  message: z.string().optional(),
  files: z
    .any()
    .refine((files) => files?.length > 0, "Please upload at least one image"),
});

type uploadValues = z.infer<typeof uploadSchema>;

const ImageUploadModal: React.FC<Props> = ({ open, onClose, className }) => {
  const [preview, setPreview] = useState<{ url: string; type: string }[] | []>(
    []
  );
  const [progress, setProgress] = useState<number>(0);

  const { eventId } = useParams();
  const { fetchMedia } = useMediaStore();

  const form = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      message: "",
      files: [],
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    reset,
  } = form;

  const files = watch("files");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (currentFiles) => {
      const validFiles: File[] = [];

      currentFiles.forEach((file) => {
        const maxSize = file.type.startsWith("image")
          ? 8 * 1024 * 1024
          : 1 * 1024 * 1024 * 1024;

        if (maxSize > file.size) {
          validFiles.push(file);
        } else {
          toast.error("File size exceeds limit", {
            description: `${file.name}`,
          });
        }
      });

      setPreview((prev) => [
        ...prev,
        ...validFiles.map((file) => ({
          url: URL.createObjectURL(file),
          type: file.type.split("/")[0],
        })),
      ]);
      setValue("files", [...files, ...validFiles], {
        shouldValidate: true,
      });
    },
    accept: { "image/*": [], "video/*": [] },
    onDropRejected: (files) => {
      files.map((file) => {
        if (file.errors[0].code === "file-invalid-type") {
          toast.error(`Invalid file type`, {
            description: file.errors[0].message,
          });
        } else {
          toast.error(`Some files couldn't be added`, {
            description: file.file.name,
          });
        }
      });
    },
    maxFiles: 99,
  });

  const { startUpload, isUploading } = useUploadThing("mediaUploader", {
    onClientUploadComplete: () => {
      reset();
      setPreview([]);
      setProgress(0);
      handleClose();
    },
    onUploadProgress: setProgress,
  });

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<uploadValues> = async (data) => {
    if (!eventId || Array.isArray(eventId)) {
      throw new Error("Missing event id");
    }

    try {
      await startUpload(data.files, {
        name: data.name,
        message: data.message || "",
        eventId: Number(eventId),
      });

      await fetchMedia();
    } catch (error) {
      console.log(error);
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
            placeholder="Message (optional)"
          />
          {errors.message && (
            <span className="text-red-400 text-sm mb-3 ml-1">
              {errors.message?.message}
            </span>
          )}
          <div
            {...getRootProps()}
            className={`flex justify-start border border-dashed border-b-gray-300 rounded-md text-gray-500 text-sm p-2 ${
              isDragActive ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {files.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-2">
                <CloudDownload />
                <p className="text-center">
                  Drag and drop or click to select files
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 overflow-y-auto max-h-60">
                {preview.map((item, index) => (
                  <figure
                    key={index}
                    className="relative w-full h-24 aspect-square cursor-pointer"
                  >
                    {item.type.startsWith("image") ? (
                      <Image
                        src={item.url}
                        fill
                        alt=""
                        className="object-cover object-center rounded"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-24 object-cover"
                      />
                    )}
                  </figure>
                ))}
              </div>
            )}
            <input {...getInputProps()} />

            {errors.files && (
              <span className="text-red-400 text-sm mb-3 ml-1">
                {errors.files.message as string}
              </span>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2 mt-2">
              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-sm">{progress}%</p>
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            // disabled={!isValid}
            className="mt-2"
          >
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
