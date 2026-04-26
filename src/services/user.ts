import { API } from "@/api/api";
import type { PrivateUserDTO, PublicUserDTO } from "@/types/user";

export const userService = {
  register: async (data: PrivateUserDTO) => {
    const response = await API.post<PublicUserDTO>("/user", data);
    return response;
  },

  getMe: async () => {
    const response = await API.get<PublicUserDTO>("/user");
    return response;
  },
};
