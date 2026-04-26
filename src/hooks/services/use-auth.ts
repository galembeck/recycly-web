import { type ApiException } from "@/api/api";
import { authService } from "@/services/auth";
import { useAuth as useAuthProvider } from "@/providers/auth-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, refetch } = useAuthProvider();

  const [serverError, setServerError] = useState("");

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: (data: { identifier: string; password: string }) => authService.signIn(data),
    onSuccess: async () => {
      await refetch();
      toast.success("Bem-vindo de volta!", {
        description: "Redirecionando para o painel administrativo...",
      });
      navigate({ to: "/admin/dashboard" });
    },
    onError: (err) => {
      const message =
        (err as ApiException).status === 400
          ? "E-mail ou senha inválidos."
          : "Erro ao realizar login. Tente novamente.";
      setServerError(message);
      toast.error("Erro ao realizar login!", {
        description: message,
      });
    },
  });

  const { mutate: signOut } = useMutation({
    mutationFn: authService.signOut,
    onSettled: () => {
      queryClient.setQueryData(["auth", "me"], null);
      navigate({ to: "/" });
    },
  });

  return { signIn, signOut, isPending, serverError, setServerError, user, isAuthenticated };
}
