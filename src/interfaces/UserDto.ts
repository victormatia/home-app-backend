import { Immobile, User } from '@prisma/client';

export interface CreateUserDTO {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  cpf: string;
  birthDate: Date | null;
}

export interface getUserDto {
  id: string;
  name: string;
  email: string;
  birthDate?: Date;
  cpf?: Date;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  password?: string;
  cpf?: string;
  birthDate?: Date;
}

export interface UniqueUserDTO extends User {
  owner: Immobile[];
  tenant: Immobile[];
}

