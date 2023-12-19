import { Immobile, Prisma, PrismaClient } from '@prisma/client';
import IService from '../interfaces/IService';

class ImmobileService {
  private _model: PrismaClient;

  constructor(model: PrismaClient) {
    this._model = model;
  }

  public async create(immobileInfo: Immobile): Promise<IService<Immobile>> {
    try {
      const { ownerId, addressId, typeId, ...otherInfos } = immobileInfo;

      const data: Prisma.ImmobileCreateInput = {
        ...otherInfos,
        address: { connect: { id: addressId } },
        owner: { connect: { id: ownerId } },
        type: { connect: { id: typeId } },
      };

      const registeredImmobile = await this._model.immobile.create({ data });

      return { result: registeredImmobile };

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong, new immobile was not registered' };
    }
  }

  public async getAll(): Promise<IService<Immobile[]>> {
    try {
      const allImmobiles = await this._model.immobile.findMany({
        include: {
          address: true,
          type: true,
          photos: {select: {photo: { select: { url: true } }}},
        },
      });

      return { result: allImmobiles };

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async getImmobileById(id: string): Promise<IService<Immobile>> {
    try {
      const immobile = await this._model.immobile.findUnique({where: { id: id }});
  
      return { result: immobile || null };
  
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async deleteImmobileById(id: string): Promise<IService<Immobile>> {
    try {
      await this._model.immobilePhoto.deleteMany({where: { immobileId: id }});
      const immobile = await this._model.immobile.delete({where: { id: id }});
  
      return { result: immobile || null };
  
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async updateImmobileById(id: string, immobileInfo: Immobile): Promise<IService<Immobile>> {
    try {
      const { ownerId, addressId, typeId, ...otherInfos } = immobileInfo;
  
      if (ownerId === undefined || addressId === undefined || typeId === undefined) {
        return { message: 'ownerId, addressId, and typeId must be provided' };
      }
  
      const data: Prisma.ImmobileUpdateInput = {
        ...otherInfos,
        address: { connect: { id: addressId } },
        owner: { connect: { id: ownerId } },
        type: { connect: { id: typeId } },
      };
  
      const updatedImmobile = await this._model.immobile.update({
        where: { id: id },
        data: data,
      });
  
      return { result: updatedImmobile };
  
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }
}

export default ImmobileService;