import { API } from "@/api/api";
import type { PrivateUserDTO, PublicUserDTO } from "@/types/user";

export const userService = {
  register: async (data: PrivateUserDTO) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("document", data.document);
    if (data.birthDate) formData.append("birthDate", data.birthDate);
    data.phones?.forEach((p) => formData.append("phones", p));
    formData.append("password", data.password);
    formData.append("profileType", String(data.profileType));
    if (data.avatar) formData.append("avatar", data.avatar);

    return API.postForm<PublicUserDTO>("/user", formData);
  },

  getMe: async () => {
    const response = await API.get<PublicUserDTO>("/user");
    return response;
  },
};
