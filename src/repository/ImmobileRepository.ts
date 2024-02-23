import { Immobile, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class ImmobileRepository {
  private _model: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prismaCliente: PrismaClient) {
    this._model = prismaCliente;
  }

  async create(data: Prisma.ImmobileCreateInput): Promise<Immobile> {
    return await this._model.immobile.create({ data });
  }

  async getAll(): Promise<Immobile[]> {
    const allImmobiles = await this._model.immobile.findMany({
      include: {
        address: true,
        type: true,
        photos: {select: {photo: { select: { url: true } }}},
      },
    });
    return allImmobiles;
  }

  async findById(id: string) {
    const immobile = await this._model.immobile.findUnique({
      where: { id: id },
      include: {
        address: true,
        type: true,
        photos: { select: { photo: { select: { url: true } } } },
      },
    });
    return immobile;
  }

  
  async update(id: string, data: Prisma.ImmobileUpdateInput): Promise<Immobile> {
  
    const updatedImmobile = await this._model.immobile.update({
      where: { id: id },
      data: data, 
    });

    return updatedImmobile;
  
  }

  async delete(id: string): Promise<Immobile> {
    await this._model.immobilePhoto.deleteMany({where: { immobileId: id }});
    const immobile = await this._model.immobile.delete({where: { id: id }});

    return immobile;
  }

  async findByIdAndOwnerId(id: string, ownerId: string) {
    return this._model.immobile.findFirstOrThrow({where: {id, ownerId: ownerId} });
  }

}

export default ImmobileRepository;