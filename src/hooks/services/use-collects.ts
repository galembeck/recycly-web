import { type ApiException } from "@/api/api";
import { collectService } from "@/services/collect";
import type { CreateCollectInput } from "@/types/collect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCollect(id: string) {
  return useQuery({
    queryKey: ["collects", id],
    queryFn: () => collectService.getById(id),
    enabled: !!id,
  });
}

export function useCooperativeCollects() {
  return useQuery({
    queryKey: ["collects", "cooperative"],
    queryFn: () => collectService.getByCooperative(),
  });
}

export function useCreateCollect(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCollectInput) => collectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Coleta registrada com sucesso!");
      onSuccess?.();
    },
    onError: (err) => {
      toast.error("Erro ao registrar coleta.", {
        description: (err as ApiException).message,
      });
    },
  });
}

export function useDeleteCollect() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => collectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Coleta removida com sucesso.");
    },
    onError: (err) => {
      toast.error("Erro ao remover coleta.", {
        description: (err as ApiException).message,
      });
    },
  });
}
