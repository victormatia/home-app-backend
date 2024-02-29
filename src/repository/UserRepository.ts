import { Prisma, PrismaClient, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UniqueUserDTO } from '../interfaces/UserDto';


class UserRepository {
  private _model: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prismaCliente: PrismaClient) {
    this._model = prismaCliente;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this._model.user.create({ data });
  }

  async getAll(): Promise<User[]> {
    return await this._model.user.findMany({ where: { deleted: false } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._model.user.findUnique({ where: { email, deleted: false } });
  }

  async findById(id: string, includeImmobiles: boolean): Promise<UniqueUserDTO | null> {
    return this._model.user.findUnique(
      {
        where: { id, deleted: false },
        include: {
          owner: {
            include: {
              address: true,
              photos: { select: { photo: { select: { url: true } } } },
            },
          },
          tenant: includeImmobiles,
          // eslint-disable-next-line max-len
          favoriteImmobile: {include: { immobile: { include: { photos: { select: { photo: { select: { url: true } } } }, address: true, type: true } } }},
        },
      }) as Promise<UniqueUserDTO | null>;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this._model.user.update({ where: { id, deleted: false }, data });
  }

  async delete(id: string): Promise<void> {
    await this._model.user.update({ where: { id, deleted: false }, data: { deleted: true } });
  }

  async purge(id: string): Promise<void> {
    await this._model.user.delete({ where: { id } });
  }

  async activate(id: string): Promise<void> {
    await this._model.user.update({ where: { id, deleted: true }, data: { deleted: false } });
  }
}

export default UserRepository;
