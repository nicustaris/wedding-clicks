import React from "react";

import WeddingAlbum from "@/components/wedding-album";

import { Camera, UsersRound } from "lucide-react";
import ImageUploadWrapper from "@/components/image-upload-wrapper";

const Page = async () => {
  return (
    <div className="w-full">
      <div
        className="relative flex flex-col justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url(/event-bg.jpeg)", height: "35vh" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div>
          <div className="flex flex-col absolute top-1/3">
            <h1 className="text-2xl italic font-allura">Nicu & Doina</h1>
            <span className="text-2xl font-allura">Wedding</span>
          </div>

          <div className="absolute bottom-6">
            <div className="flex flex-col gap-4">
              <ImageUploadWrapper />
              <div className="flex gap-4">
                <span className="inline-flex items-center gap-1 text-sm">
                  <Camera size={15} /> 15 photos
                </span>
                <span className="inline-flex items-center gap-1 text-sm">
                  <UsersRound size={15} /> 4 participants
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WeddingAlbum />
    </div>
  );
};

export default Page;
