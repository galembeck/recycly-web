export interface PrivateUserDTO extends Omit<
  PublicUserDTO,
  "id" | "createdAt" | "lastAccessAt"
> {
  profileType: 1;
  password: string;
}

export interface PublicUserDTO {
  id: string;
  name: string;
  email: string;
  document: string;
  birthDate: string;
  phones: string[];
  profileType: number;
  createdAt: string;
  lastAccessAt: string | null;
}
