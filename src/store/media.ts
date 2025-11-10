import { Api } from "@/services/api-client";
import { create } from "zustand";
import { SessionWithMedia } from "../../@types/prisma";
import { Media } from "../../@types/media";

interface MediaStore {
  media: Media[];
  totalParticipants: number;
  totalMedia: number;
  loading: boolean;
  error: string | null;
  fetchMedia: (eventId: number) => Promise<void>;
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

      const data = await Api.media.getAll(eventId);
      console.log(data);
      set({
        media: data.media ?? [],
        totalMedia: data.media.length,
        totalParticipants: data.totalParticipants,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch media" });
    }
  },
}));
