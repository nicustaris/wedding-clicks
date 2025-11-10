import { MediaWithParticipants } from "../../@types/media";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getAll = async (
  eventId: number
): Promise<MediaWithParticipants> => {
  const { data } = await axiosInstance.get<MediaWithParticipants>(
    ApiRoutes.MEDIA,
    {
      params: { eventId },
    }
  );

  return data;
};
