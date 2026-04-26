import { type ApiException } from "@/api/api";
import { authService } from "@/services/auth";
import { useAuth as useAuthProvider } from "@/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export function useAuth() {
  const navigate = useNavigate();
  const { refetch } = useAuthProvider();

  const [serverError, setServerError] = useState("");

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: authService.signIn,
    onSuccess: () => {
      refetch();
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

  return { signIn, isPending, serverError, setServerError };
}
