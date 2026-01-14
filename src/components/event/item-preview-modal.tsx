import React from "react";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";

interface PreviewItemProps {
  url: string;
  type: "image" | "video";
  className?: string;
  onRemove: () => void;
}

const ItemPreviewModal: React.FC<PreviewItemProps> = ({
  url,
  type,
  onRemove,
}) => {
  return (
    <figure key={url} className="relative w-full aspect-square cursor-pointer">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        type="button"
        className="absolute top-1 right-1 z-20 bg-[#2727275e] hover:bg-black/60 p-1 rounded-full pointer-events-auto animation-all duration-300"
      >
        <RiCloseFill className="text-white" />
      </button>
      {type === "video" ? (
        <div className="w-full h-full relative cursor-pointer">
          <Image
            src={url}
            fill
            alt=""
            className="object-cover object-center rounded-md"
          />
          <button className="absolute top-1 right-1 bg-black/50 hover:bg-black p-0.5 rounded-full">
            <RiCloseFill className="text-white" />
          </button>
          <div className="flex absolute inset-0 justify-center items-center">
            <div className="bg-black/50 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={url}
          alt=""
          fill
          className="object-cover object-center rounded"
        />
      )}
    </figure>
  );
};

export default ItemPreviewModal;
