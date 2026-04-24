import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { type ApiException } from "@/services/api";
import { authService, type User } from "@/services/auth";

type AuthContextValue = {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	refetch: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();

	const { data: user = null, isLoading } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			try {
				return await authService.getMe();
			} catch (err) {
				if ((err as ApiException).status === 401) return null;
				throw err;
			}
		},
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	function refetchUser() {
		queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated: user !== null,
				refetch: refetchUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
