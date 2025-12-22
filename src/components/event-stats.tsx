"use client";

import { useMediaStore } from "@/store/media";
import ImageUploadWrapper from "./image-upload-wrapper";
import { Camera, UsersRound } from "lucide-react";

export const EventStats = () => {
  const { totalParticipants, totalMedia, loading } = useMediaStore();
  // TODO: Loading state
  return (
    <div className="absolute bottom-6">
      <div className="flex flex-col gap-4">
        <ImageUploadWrapper />
        <div className="flex gap-4">
          <span className="inline-flex items-center gap-1 text-sm">
            <Camera size={15} /> {totalMedia} photos
          </span>
          <span className="inline-flex items-center gap-1 text-sm">
            <UsersRound size={15} /> {totalParticipants} participants
          </span>
        </div>
      </div>
    </div>
  );
};
