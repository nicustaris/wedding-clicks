import { Api } from "@/services/api-client";
import { Media } from "@prisma/client";
import { create } from "zustand";

interface MediaStore {
  media: Media[];
  loading: boolean;
  error: string | null;
  fetchMedia: () => Promise<void>;
}

export const useMediaStore = create<MediaStore>((set) => ({
  media: [],
  loading: false,
  error: null,

  fetchMedia: async () => {
    try {
      set({ loading: true, error: null });

      const data = await Api.media.getAll();
      set({ media: data, loading: false, error: null });
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch media" });
    }
  },
}));
