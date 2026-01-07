import { useCallback, useEffect, useState } from "react";

export function useFavorites(eventId: number) {
  const storageKey = `weddino-event-${eventId}`;

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [eventId, storageKey]);

  const toggleFavorite = useCallback((mediaId: number) => {
    setFavorites((prev) =>
      prev.includes(mediaId)
        ? prev.filter((id) => id !== mediaId)
        : [...prev, mediaId]
    );
  }, []);

  const isFavorite = useCallback(
    (mediaId: number) => {
      return favorites.includes(mediaId);
    },
    [favorites]
  );

  return {
    toggleFavorite,
    isFavorite,
  };
}
