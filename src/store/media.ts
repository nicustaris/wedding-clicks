import { Api } from "@/services/api-client";
import { create } from "zustand";
import { MediaDTO } from "../../@types/media";

interface MediaStore {
  media: MediaDTO[];
  totalParticipants: number;
  totalMedia: number;
  loading: boolean;
  error: string | null;
  fetchMedia: (eventId: number) => Promise<void>;
  updateMedia: (items: MediaDTO[]) => void;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  media: [],
  totalParticipants: 0,
  totalMedia: 0,
  loading: true,
  error: null,

  fetchMedia: async (eventId: number) => {
    try {
      set({ loading: true, error: null });

      const media = await Api.media.getMedia(eventId);
      const participants = await Api.media.getTotalParticipants(eventId);
      set({
        media: media ?? [],
        totalMedia: media.length ?? 0,
        totalParticipants: participants ?? 0,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch media" });
    }
  },

  updateMedia: async (items: MediaDTO[]) => {
    set((state) => ({
      media: [...items, ...state.media],
    }));
  },
}));
