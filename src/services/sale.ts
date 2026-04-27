import { API } from "@/api/api";
import type { CreateSaleInput, Sale } from "@/types/sale";

export const saleService = {
  getMine: () => API.get<Sale[]>("/sale"),
  create: (data: CreateSaleInput) => API.post<Sale>("/sale", data),
  delete: (id: string) => API.delete<void>(`/sale/${id}`),
};
