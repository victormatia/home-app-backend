export interface CreateUserDTO {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  cpf: string;
  birthDate: Date | null;
}