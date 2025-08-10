import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
}

const ImageGallery: React.FC<Props> = ({ className }) => {
  const images = Array.from({ length: 50 });
  return (
    <section className={cn("bg-white text-background p-1", className)}>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-2">
        {images.map((_, index) => (
          <figure key={index} className="relative w-full aspect-square">
            <Image
              src="/eventphoto.jpg"
              alt="Image"
              className="object-cover object-center"
              fill
            />
            <figcaption className="w-full absolute bottom-0 right-0 bg-gray-500/45 text-end">
              <span className="text-foreground text-[10px] px-2 md:text-[14px]">
                Sandu Staris
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
