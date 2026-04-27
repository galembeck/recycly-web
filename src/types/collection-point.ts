import type { Material } from "./material";

export interface CollectionPoint {
  id: string;
  name: string;
  description: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  openingTime: string;
  closingTime: string;
  phone: string;
  isOpen: boolean;
  cooperativeId: string;
  materials: Material[];
  createdAt: string;
}

export interface CreateCollectionPointInput {
  name: string;
  description: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  openingTime: string;
  closingTime: string;
  phone: string;
  materialIds: string[];
}
