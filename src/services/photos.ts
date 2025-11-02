import { Media } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { SessionWithMedia } from "../../@types/prisma";

export const getAll = async (eventId: number) => {
  const { data } = await axiosInstance.get<{
    sessions: SessionWithMedia[];
    totalParticipants: number;
    totalMedia: number;
  }>(ApiRoutes.MEDIA, {
    params: { eventId },
  });

  return data;
};
