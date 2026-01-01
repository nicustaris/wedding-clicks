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
  updateMedia: (items: MediaDTO[], eventId: number) => void;
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

  updateMedia: async (items: MediaDTO[], eventId: number) => {
    set((state) => {
      const existingIds = new Set(state.media.map((m) => m.id));
      const filtered = items
        .filter((i) => !existingIds.has(i.id))
        .sort((a, b) => b.id - a.id);
      return {
        media: [...filtered, ...state.media],
        totalMedia: state.totalMedia + filtered.length,
      };
    });

    try {
      const participants = await Api.media.getTotalParticipants(eventId);
      set({ totalParticipants: participants ?? 0 });
    } catch (error) {
      console.log(error);
    }
  },
}));
