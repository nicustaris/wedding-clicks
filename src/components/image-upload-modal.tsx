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
import { Api } from "@/services/api-client";
import { useMediaStore } from "@/store/media";
import { CloudDownload } from "lucide-react";
import Image from "next/image";

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
  const [preview, setPreview] = useState<string[] | []>([]);
  const { eventId } = useParams();
  const { fetchMedia } = useMediaStore();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      setPreview((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
      const existingFiles = watch("files") || [];
      setValue("files", [...existingFiles, ...files], {
        shouldValidate: true,
      });
    },
    maxFiles: 99,
  });

  const form = useForm({
    resolver: zodResolver(imageUploadSchema),
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
  } = form;

  const files = watch("files");

  const handleClose = () => {
    onClose();
  };

  console.log("files", files);

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
            placeholder="Message (optional)"
          />
          {errors.message && (
            <span className="text-red-400 text-sm mb-3 ml-1">
              {errors.message?.message}
            </span>
          )}
          <div
            {...getRootProps()}
            className="flex border border-dashed border-b-gray-300 rounded-md text-gray-500 text-sm py-5 justify-center"
          >
            {files.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-2">
                <CloudDownload />
                <p className="text-center">
                  Drag and drop or click to select files
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-60">
                {preview.map((u, index) => (
                  <div key={index} className="w-full aspect-square">
                    <Image src={u} alt="" width={400} height={400} />
                  </div>
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
