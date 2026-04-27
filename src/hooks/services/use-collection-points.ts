import { type ApiException } from "@/api/api";
import { collectionPointService } from "@/services/collection-point";
import type { CreateCollectionPointInput } from "@/types/collection-point";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCollectionPoints() {
  return useQuery({
    queryKey: ["collection-points", "mine"],
    queryFn: () => collectionPointService.getMine(),
  });
}

export function useAllCollectionPoints() {
  return useQuery({
    queryKey: ["collection-points", "all"],
    queryFn: () => collectionPointService.getAll(),
  });
}

export function useCreateCollectionPoint(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCollectionPointInput) =>
      collectionPointService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-points"] });
      toast.success("Ponto de coleta cadastrado com sucesso!");
      onSuccess?.();
    },
    onError: (err) => {
      toast.error("Erro ao cadastrar ponto de coleta.", {
        description: (err as ApiException).message,
      });
    },
  });
}

export function useDeleteCollectionPoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => collectionPointService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-points"] });
      toast.success("Ponto de coleta removido.");
    },
    onError: (err) => {
      toast.error("Erro ao remover ponto de coleta.", {
        description: (err as ApiException).message,
      });
    },
  });
}
