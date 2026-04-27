import type { Material } from "./material";

export interface Collect {
  id: string;
  collectionPointId: string;
  collectionPointName?: string;
  userId: string;
  materialId: string;
  material?: Material;
  weightKg: number;
  collectedAt: string;
  notes?: string | null;
  createdAt: string;
}

export interface CreateCollectInput {
  collectionPointId: string;
  materialId: string;
  weightKg: number;
  collectedAt: string;
  notes?: string;
}
