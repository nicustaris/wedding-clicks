import { Api } from "@/services/api-client";
import { create } from "zustand";
import { SessionWithMedia } from "../../@types/prisma";

interface MediaStore {
  session: SessionWithMedia[];
  loading: boolean;
  error: string | null;
  fetchMedia: () => Promise<void>;
}

export const useMediaStore = create<MediaStore>((set) => ({
  session: [],
  loading: true,
  error: null,

  fetchMedia: async () => {
    try {
      set({ loading: true, error: null });

      const data = await Api.media.getAll();
      set({ session: data, loading: false, error: null });
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch media" });
    }
  },
}));
