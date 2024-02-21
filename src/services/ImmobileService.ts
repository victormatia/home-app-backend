import { FavoriteImmobile, Prisma, PrismaClient, Immobile } from '@prisma/client';
import IService from '../interfaces/IService';
import { CreateImmobile, Type } from '../interfaces/IImmobile';

class ImmobileService {
  private _model: PrismaClient;

  constructor(model: PrismaClient) {
    this._model = model;
  }

  public async create(immobileInfo: CreateImmobile): Promise<IService<Immobile>> {
    try {
      const { ownerId, address, typeId, ...otherInfos } = immobileInfo;
  
      const immobileData: Prisma.ImmobileCreateInput = {
        ...otherInfos,
        address: { create: { ...address } },
        owner: { connect: { id: ownerId } },
        type: { connect: { id: typeId } },
      };
  

      const registeredImmobile = await this._model.immobile.create({ data: immobileData });
      return { result: registeredImmobile as unknown as Immobile };
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
      const immobile = await this._model.immobile.findUnique({
        where: { id: id }, 
        include: {
          address: true,
          type: true,
          photos: {select: {photo: { select: { url: true } }}},
        },
      });
  
      if (immobile === null) {
        return { message: 'Immobile not found', status: 400 };
      }
  
      return { result: immobile };
  
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong', status: 500 };
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

  public async updateImmobileById(id: string, immobileInfo: CreateImmobile ): Promise<IService<Immobile>> {
    try {
      const { ownerId, address, typeId, ...otherInfos } = immobileInfo;
  
      if (ownerId === undefined || address === undefined || typeId === undefined) {
        return { message: 'ownerId, address, and typeId must be provided' };
      }
  
      const existingImmobile = await this._model.immobile.findUnique({ where: { id: id }, include: { address: true } });
      if (!existingImmobile) {
        return { message: 'Immobile with the given id does not exist' };
      }
  
      if (!existingImmobile.address || existingImmobile.address.id !== address.id) {
        return { message: 'Address with the given id does not exist or is not connected to the Immobile' };
      }
  
      const data: Prisma.ImmobileUpdateInput = {
        ...otherInfos,
        owner: { connect: { id: ownerId } },
        type: { connect: { id: typeId } },
        address: { update: { ...address }},
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

  public async favoriteImmobile(immobileId: string, userId: string): Promise<IService<FavoriteImmobile>> {
    try {
      const existingFavorite = await this._model.favoriteImmobile.
        findUnique({where: { userId_immobileId: { userId: userId, immobileId: immobileId } }});
      if (existingFavorite) {
        return { message: 'This immobile is already favorited by the user' };
      }
      const favorite = await this._model.favoriteImmobile.
        create({data: { immobileId: immobileId, userId: userId }});
      return { result: favorite };
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async unfavoriteImmobile(immobileId: string, userId: string): Promise<IService<FavoriteImmobile>> {
    try {
      const existingFavorite = await this._model.favoriteImmobile.
        findUnique({where: { userId_immobileId: { userId: userId, immobileId: immobileId }}});
  
      if (!existingFavorite) {
        return { message: 'This immobile is not favorited by the user' };
      }
  
      const favorite = await this._model.favoriteImmobile.
        delete({where: { userId_immobileId: { userId: userId, immobileId: immobileId }}});
  
      return { result: favorite };
  
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async getAllTypes(): Promise<IService<Type[]>> {
    try {
      const allTypes = await this._model.immobileType.findMany({include: {}});
      return { result: allTypes};
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }
}

export default ImmobileService;