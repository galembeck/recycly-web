import { API } from "@/api/api";
import type {
  CollectionPoint,
  CreateCollectionPointInput,
} from "@/types/collection-point";

export const collectionPointService = {
  getAll: () => API.get<CollectionPoint[]>("/collectionpoint"),
  getMine: () => API.get<CollectionPoint[]>("/collectionpoint/mine"),
  getById: (id: string) => API.get<CollectionPoint>(`/collectionpoint/${id}`),
  create: (data: CreateCollectionPointInput) =>
    API.post<CollectionPoint>("/collectionpoint", data),
  update: (id: string, data: CreateCollectionPointInput) =>
    API.put<CollectionPoint>(`/collectionpoint/${id}`, data),
  updateMaterials: (id: string, materialIds: string[]) =>
    API.put<void>(`/collectionpoint/${id}/materials`, { materialIds }),
  delete: (id: string) => API.delete<void>(`/collectionpoint/${id}`),
};
