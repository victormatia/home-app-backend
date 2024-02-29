import { Immobile, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateImmobileDTO, UpdateImmobileDTO } from '../interfaces/ImmobileDto';

class ImmobileRepository {
  private _model: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prismaCliente: PrismaClient) {
    this._model = prismaCliente;
  }

  async create(data: CreateImmobileDTO): Promise<Immobile> {

    const {address, ownerId, typeId, photos, ...otherInfos} = data;
    const immobileData: Prisma.ImmobileCreateInput = {
      ...otherInfos,
      address: { create: { ...address } },
      owner: { connect: { id: ownerId } },
      type: { connect: { id: typeId } },
      photos: {createMany: {data: photos}},
    };
    return await this._model.immobile.create({ data: immobileData });
  }

  async getAll(): Promise<Immobile[]> {
    const allImmobiles = await this._model.immobile.findMany({
      include: {
        address: true,
        type: true,
        photos: {select: {url: true}},
      },
    });
    return allImmobiles;
  }

  async findById(id: string):Promise<Immobile | null> {
    const immobile = await this._model.immobile.findUnique({
      where: { id: id },
      include: {
        address: true,
        type: true,
        photos: { select:  { url: true }  },
      },
    });
    return immobile;
  }

  
  async update(id: string, data: UpdateImmobileDTO): Promise<Immobile> {
    const {address, photos, ...otherInfos} = data;

    const immobileData: Prisma.ImmobileUpdateInput = {
      address:{update: {data: address}},
      photos: {updateMany: {...photos}},
      ...otherInfos,
    };
  
    const updatedImmobile = await this._model.immobile.update({
      where: { id: id },
      data: immobileData,
    });

    return updatedImmobile;
  
  }

  async delete(id: string): Promise<Immobile> {
    const immobile = await this._model.immobile.delete({where: { id: id }});

    return immobile;
  }

  async findByIdAndOwnerId(id: string, ownerId: string) {
    return this._model.immobile.findFirstOrThrow({where: {id, ownerId: ownerId} });
  }

}

export default ImmobileRepository;