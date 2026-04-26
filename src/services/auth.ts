import { API } from "@/api/api";
import type { SignInRequest } from "@/types/auth";

export const authService = {
  signIn: (data: SignInRequest) => API.post<void>("/auth", data),

  signOut: () => API.post<void>("/auth/revoke"),
};
