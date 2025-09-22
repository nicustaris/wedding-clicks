import { Media } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { SessionWithMedia } from "../../@types/prisma";

export const getAll = async () => {
  const { data } = await axiosInstance.get<SessionWithMedia[]>(ApiRoutes.MEDIA);

  return data;
};
