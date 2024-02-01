import { FavoriteImmobile, Immobile, Prisma, PrismaClient } from '@prisma/client';
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

  public async updateImmobileById(id: string, immobileInfo: Immobile): Promise<IService<Immobile>> {
    try {
      const { ownerId, addressId, typeId, ...otherInfos } = immobileInfo;
  
      if (ownerId === undefined || addressId === undefined || typeId === undefined) {
        return { message: 'ownerId, addressId, and typeId must be provided' };
      }
  
      const address = await this._model.address.findUnique({ where: { id: addressId } });
      if (!address) {
        return { message: 'Address with the given id does not exist' };
      }
  
      const data: Prisma.ImmobileUpdateInput = {
        ...otherInfos,
        owner: { connect: { id: ownerId } },
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

  public async favoriteImmobile(id: string, userId: string): Promise<IService<FavoriteImmobile>> {
    try {
      const existingFavorite = await this._model.favoriteImmobile.
        findUnique({where: { userId_immobileId: { userId: userId, immobileId: id } }});
      if (existingFavorite) {
        return { message: 'This immobile is already favorited by the user' };
      }
      const favorite = await this._model.favoriteImmobile.
        create({data: { immobileId: id, userId: userId }});
      return { result: favorite };
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async unfavoriteImmobile(id: string, userId: string): Promise<IService<FavoriteImmobile>> {
    try {
      const existingFavorite = await this._model.favoriteImmobile.
        findUnique({where: { userId_immobileId: { userId: userId, immobileId: id }}});
  
      if (!existingFavorite) {
        return { message: 'This immobile is not favorited by the user' };
      }
  
      const favorite = await this._model.favoriteImmobile.
        delete({where: { userId_immobileId: { userId: userId, immobileId: id }}});
  
      return { result: favorite };
  
    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }
}

export default ImmobileService;