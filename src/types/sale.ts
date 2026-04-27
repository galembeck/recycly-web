import type { Material } from "./material";

export interface Sale {
  id: string;
  buyerName: string;
  weightKg: number;
  price: number;
  soldAt: string;
  notes?: string | null;
  cooperativeId: string;
  materials: Material[];
  createdAt: string;
}

export interface CreateSaleInput {
  buyerName: string;
  materialIds: string[];
  weightKg: number;
  price: number;
  soldAt: string;
  notes?: string;
}
