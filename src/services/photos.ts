import { Media } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getAll = async () => {
  const { data } = await axiosInstance.get<Media[]>(ApiRoutes.MEDIA);

  return data;
};
