export interface UserCreateDTO {
  id: string;
  name?: string;
  email: string;
  password?: string;
  cpf: string;
  birthDate?: Date;
}