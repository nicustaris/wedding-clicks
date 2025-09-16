import { Media } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { AxiosRequestConfig } from "axios";

export const mediaUpload = async (
  data: FormData,
  config?: AxiosRequestConfig
) => {
  return (
    await axiosInstance.post<Media>(ApiRoutes.UPLOAD, data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    })
  ).data;
};
