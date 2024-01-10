import { Immobile, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { AddressNotFoundError } from '../error/AddressNotFoundError';
import { CreateImmobileDTO, UpdateImmobileDTO } from '../interfaces/ImmobileDto';

class ImmobileRepository {
  private _model: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prismaCliente: PrismaClient) {
    this._model = prismaCliente;
  }

  async create(data: CreateImmobileDTO): Promise<Immobile> {
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

  async findById(id: string): Promise<Immobile | null> {
    const immobile = await this._model.immobile.findUnique({where: { id: id }});
    return immobile;
  }

  async update(id: string, immobileInfo: UpdateImmobileDTO): Promise<Immobile> {
    const { ownerId, addressId, ...otherInfos } = immobileInfo;
    const address = await this._model.address.findUnique({ where: { id: addressId } });
    if (!address) {
      throw new AddressNotFoundError();
    }
  
    const data: Prisma.ImmobileUpdateInput = {
      ...otherInfos,
      owner: { connect: { id: ownerId } },
    };
  
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

}

export default ImmobileRepository;