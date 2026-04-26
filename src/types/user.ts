export interface PrivateUserDTO extends Omit<
  PublicUserDTO,
  "id" | "createdAt" | "lastAccessAt" | "avatarUrl"
> {
  profileType: 1;
  password: string;
  avatar?: File;
}

export interface PublicUserDTO {
  id: string;
  name: string;
  email: string;
  document: string;
  avatarUrl?: string | null;
  birthDate: string;
  phones: string[];
  profileType: number;
  createdAt: string;
  lastAccessAt: string | null;
}
