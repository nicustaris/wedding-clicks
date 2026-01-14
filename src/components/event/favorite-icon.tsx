import { cn } from "@/lib/utils";
import React from "react";
import { GoHeartFill } from "react-icons/go";

interface FavoriteIconProps {
  mediaId: number;
  isFavorite: (mediaId: number) => boolean;
  toggleFavorite: (mediaId: number) => void;
  onAnimate: () => void;
}

const FavoriteIcon = React.memo(function FavoriteIcon({
  mediaId,
  isFavorite,
  toggleFavorite,
  onAnimate,
}: FavoriteIconProps) {
  const favorite = isFavorite(mediaId);

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        if (!favorite) onAnimate();
        toggleFavorite(mediaId);
      }}
      className="absolute top-0 right-0 p-1.5"
    >
      <GoHeartFill
        size={22}
        className={cn(
          "transition-all duration-300",
          isFavorite(mediaId) ? "text-red-500" : "text-white/90"
        )}
      />
    </span>
  );
});

export default FavoriteIcon;
