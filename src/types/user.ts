export interface PrivateUserDTO extends Omit<
  PublicUserDTO,
  "id" | "createdAt" | "lastAccessAt" | "documentUrl"
> {
  profileType: 1;
  password: string;
  documentFile?: File;
}

export interface PublicUserDTO {
  id: string;
  name: string;
  email: string;
  document: string;
  documentUrl?: string | null;
  birthDate: string;
  phones: string[];
  profileType: number;
  createdAt: string;
  lastAccessAt: string | null;
}
