import { API } from "@/api/api";
import type { Material } from "@/types/material";

export const materialService = {
  getAll: () => API.get<Material[]>("/material"),
};
