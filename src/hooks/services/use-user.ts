import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import type { ApiException } from "@/api/api";
import type { PrivateUserDTO } from "@/types/user";
import { useState } from "react";

export function useUser() {
  const navigate = useNavigate();

  const { refetch } = useAuth();

  const [serverError, setServerError] = useState("");

  const { mutate: register, isPending } = useMutation({
    mutationFn: async (data: PrivateUserDTO) => {
      await userService.register(data);
      await authService.signIn({ identifier: data.email, password: data.password });
    },
    onSuccess: async () => {
      await refetch();
      toast.success("Conta criada com sucesso!", {
        description: "Redirecionando para o painel administrativo...",
      });
      navigate({ to: "/admin/dashboard" });
    },
    onError: (err) => {
      const message =
        (err as ApiException).status === 400
          ? err.message
          : "Erro ao realizar cadastro. Tente novamente.";
      setServerError(message);
      toast.error("Erro ao realizar cadastro!", {
        description: message,
      });
    },
  });

  return {
    register,
    isPending,
    serverError,
  };
}
