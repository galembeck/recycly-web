import { type ApiException } from "@/api/api";
import { saleService } from "@/services/sale";
import type { CreateSaleInput } from "@/types/sale";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSale(id: string) {
  return useQuery({
    queryKey: ["sales", id],
    queryFn: () => saleService.getById(id),
    enabled: !!id,
  });
}

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => saleService.getMine(),
  });
}

export function useCreateSale(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSaleInput) => saleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Venda registrada com sucesso!");
      onSuccess?.();
    },
    onError: (err) => {
      toast.error("Erro ao registrar venda.", {
        description: (err as ApiException).message,
      });
    },
  });
}

export function useDeleteSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => saleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Venda removida com sucesso.");
    },
    onError: (err) => {
      toast.error("Erro ao remover venda.", {
        description: (err as ApiException).message,
      });
    },
  });
}
