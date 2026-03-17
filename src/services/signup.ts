import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

type SignUpDTO = {
  name: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpDTO) => {
  const { data } = await axiosInstance.post(ApiRoutes.SIGNUP, data);

  return data;
};
