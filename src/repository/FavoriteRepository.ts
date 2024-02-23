import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class FavoriteRepository {
  private _model: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  constructor(prismaCliente: PrismaClient) {
    this._model = prismaCliente;
  }
  async create(immobileId: string, userId: string) {
    return await this._model.favoriteImmobile.create({ data: { immobileId, userId } });
  }

  async checkIfImmobileIsFavorite(immobileId: string, userId: string): Promise<{
    userId: string;
    immobileId: string;
  } | null> {
    const immobileIsFavorite = await this._model.favoriteImmobile.
      findUnique({ where: { userId_immobileId: { userId: userId, immobileId: immobileId } } });
    return immobileIsFavorite;
  }

  async delete(immobileId: string, userId: string) {
    return this._model
      .favoriteImmobile
      .delete({ where: { userId_immobileId: { userId: userId, immobileId: immobileId } } });
  }

}