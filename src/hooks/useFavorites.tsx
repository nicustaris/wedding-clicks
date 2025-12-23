import { useEffect, useState } from "react";

export function useFavorites(eventId: number) {
  const storageKey = `favorites-event-${eventId}`;

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

  const saveFavorites = (newFavorites: number[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(storageKey, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (mediaId: number) => {
    if (favorites.includes(mediaId)) {
      saveFavorites(favorites.filter((id) => id !== mediaId));
    } else {
      saveFavorites([...favorites, mediaId]);
    }
  };

  const isFavorite = (mediaId: number) => favorites.includes(mediaId);

  return {
    toggleFavorite,
    isFavorite,
  };
}
