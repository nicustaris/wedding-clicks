import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Camera, UsersRound } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

const page: React.FC<Props> = ({ className }) => {
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

          <div className="absolute bottom-5">
            <div className="flex flex-col gap-3">
              <div>
                <Button variant="outline">Upload photo</Button>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex items-center gap-1 text-xs">
                  <Camera size={15} /> 15 photos
                </span>
                <span className="inline-flex items-center gap-1 text-xs">
                  <UsersRound size={15} /> 4 participants
                </span>
              </div>
              <span className="text-xs gap-1 inline-flex">
                <span>1234</span>
                <span className="text-gray-300">photos collected</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ImageGallery />
    </div>
  );
};

export default page;
