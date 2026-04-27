import { materialService } from "@/services/material";
import { useQuery } from "@tanstack/react-query";

export function useMaterials() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: () => materialService.getAll(),
    staleTime: 1000 * 60 * 10,
  });
}
