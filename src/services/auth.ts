import { api } from "./api";

export type User = {
	id: string;
	name: string;
	email: string;
	cellphone: string;
	document: string;
	profileType: number | null;
	avatarUrl: string | null;
	createdAt: string;
	lastAccessAt: string | null;
};

export type SignInRequest = {
	email: string;
	password: string;
};

export type RegisterRequest = {
	name: string;
	email: string;
	cpf: string;
	password: string;
	birthDate: string;
	phones: string[];
};

export const authService = {
	signIn: (data: SignInRequest) => api.post<void>("/auth", data),

	register: (data: RegisterRequest) => api.post<void>("/auth/register", data),

	signOut: () => api.post<void>("/auth/revoke"),

	getMe: () => api.get<User>("/user"),
};
