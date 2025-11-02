import { Api } from "@/services/api-client";
import { create } from "zustand";
import { SessionWithMedia } from "../../@types/prisma";

interface MediaStore {
  eventId: number | null;
  sessions: SessionWithMedia[];
  totalParticipants: number;
  totalMedia: number;
  loading: boolean;
  error: string | null;
  setEventId: (id: number) => void;
  fetchMedia: () => Promise<void>;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  eventId: null,
  sessions: [],
  totalParticipants: 0,
  totalMedia: 0,
  loading: true,
  error: null,

  setEventId: (id: number) => set({ eventId: id }),

  fetchMedia: async () => {
    const { eventId } = get();
    if (!eventId) return;
    try {
      set({ loading: true, error: null });

      const data = await Api.media.getAll(eventId);
      console.log("store event id>>>>>", eventId);
      set({
        sessions: data.sessions ?? [],
        totalParticipants: data.totalParticipants,
        totalMedia: data.totalMedia,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch media" });
    }
  },
}));
