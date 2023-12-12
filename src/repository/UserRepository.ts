import { Prisma, PrismaClient, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateUserDTO } from '../interfaces/UserDto';


class UserRepository {
  private _model: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prismaCliente: PrismaClient) {
    this._model = prismaCliente;
  }

  async create(data: CreateUserDTO): Promise<User> {
    return await this._model.user.create({ data });
  }

  async getAll(): Promise<User[]> {
    return this._model.user.findMany();
  }
  async getUserById(id: string): Promise<User | null> {
    return this._model.user.findUnique({ where: { id } });
  }
}

export default UserRepository;
