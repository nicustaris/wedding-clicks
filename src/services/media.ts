import { Media } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getMedia = async (eventId: number): Promise<Media[]> => {
  const { data } = await axiosInstance.get<Media[]>(ApiRoutes.MEDIA, {
    params: { eventId },
  });

  return data;
};

export const getTotalParticipants = async (
  eventId: number
): Promise<number> => {
  const { data } = await axiosInstance.get<number>(ApiRoutes.PARTICIPANTS, {
    params: { eventId },
  });
  return data;
};
