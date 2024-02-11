import { Immobile, User } from '@prisma/client';

export interface CreateUserDTO {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  cpf: string;
  birthDate: Date | null;
}

export interface UniqueUserDTO extends User {
  owner: Immobile[],
  tenant: Immobile[] 
}

export interface ChangePasswordDTO {
  id: string;
  authId: string;
  password: string
}