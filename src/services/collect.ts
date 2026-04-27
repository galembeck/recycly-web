import { API } from "@/api/api";
import type { Collect, CreateCollectInput } from "@/types/collect";

export const collectService = {
  getMyHistory: () => API.get<Collect[]>("/collect"),
  getByCooperative: () => API.get<Collect[]>("/collect/cooperative"),
  getByPoint: (pointId: string) =>
    API.get<Collect[]>(`/collect/point/${pointId}`),
  create: (data: CreateCollectInput) => API.post<Collect>("/collect", data),
  delete: (id: string) => API.delete<void>(`/collect/${id}`),
};
