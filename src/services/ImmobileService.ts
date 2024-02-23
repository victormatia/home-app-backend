import { Immobile, Prisma } from '@prisma/client';
import ImmobileRepository from '../repository/ImmobileRepository';

import { FavoriteImmobile } from '@prisma/client';
import { BadRequestError } from '../error/BadRequestError';
import { InternalServerError } from '../error/InternalServerError';
import { NotFoundError } from '../error/NotFoundError';
import { CreateImmobile } from '../interfaces/IImmobile';
import IService from '../interfaces/IService';
import { FavoriteRepository } from '../repository/FavoriteRepository';
import { GenericErrors, ImmobileErrors } from '../util/messages';


class ImmobileService {


  constructor(private _repository: ImmobileRepository, private _favoriteRepository: FavoriteRepository) {
  }

  public async create(immobileInfo: CreateImmobile): Promise<Immobile> {
    try {
      const { ownerId, address, typeId, ...otherInfos } = immobileInfo;

      const immobileData: Prisma.ImmobileCreateInput = {
        ...otherInfos,
        address: { create: { ...address } },
        owner: { connect: { id: ownerId } },
        type: { connect: { id: typeId } },
      };


      const registeredImmobile = await this._repository.create(immobileData);
      return registeredImmobile;
    } catch (e) {
      console.error(e);
      throw new BadRequestError(ImmobileErrors.IMMOBILE_NOT_CREATED);
    }
  }

  public async getAll(): Promise<Immobile[]> {

    const allImmobiles = await this._repository.getAll();
    return allImmobiles;
  }

  public async getImmobileById(id: string): Promise<Immobile> {
    try {

      const immobile = await this._repository.findById(id);

      if (immobile === null) {
        throw new NotFoundError(ImmobileErrors.IMMOBILE_NOT_FOUND);
      }
      return immobile;
    
    } catch (e) {
      console.error(e);
      throw new InternalServerError(GenericErrors.SERVER_ERROR);
    }
  }

  public async deleteImmobileById(id: string): Promise<Immobile> {
    try {
      /* checar se fotos são deletadas em cascata */
      // await this._model.immobilePhoto.deleteMany({ where: { immobileId: id } });

      const immobile = await this._repository.delete(id);
      return immobile;
    } catch (err) {
      throw new NotFoundError(ImmobileErrors.IMMOBILE_NOT_FOUND);
    }
  }
 

  public async updateImmobileById(id: string, immobileInfo: CreateImmobile): Promise<IService<Immobile>> {
    try {
      const { ownerId, address, typeId, ...otherInfos } = immobileInfo;

      if (ownerId === undefined || address === undefined || typeId === undefined) {
        throw new BadRequestError(ImmobileErrors.UPDATE_INFO_INCOMPLETE);
      }

      const existingImmobile = await this._repository.findById(id);
      if (!existingImmobile) {
        throw new NotFoundError(ImmobileErrors.ADDRESS_NOT_FOUND);
      }

      if (!existingImmobile.address || existingImmobile.address.id !== address.id) {
        throw new BadRequestError(ImmobileErrors.IMMOBILE_AND_ADRRESS_ARE_NOT_CONNECTED);
      }

      const data: Prisma.ImmobileUpdateInput = {
        ...otherInfos,
        owner: { connect: { id: ownerId } },
        type: { connect: { id: typeId } },
        address: { update: { ...address } },
      };

      const updatedImmobile = await this._repository.update(id, data);

      return { result: updatedImmobile };

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public checkOwnership(immobileId: string, ownerId: string) {
    try {
      this._repository.findByIdAndOwnerId(immobileId, ownerId);
      return true;
    } catch (err) {
      return false;

    }
  }

  public async favoriteImmobile(immobileId: string, userId: string): Promise<FavoriteImmobile> {
    try {
      const existingFavorite = await this._favoriteRepository.checkIfImmobileIsFavorite(immobileId, userId);
      if (existingFavorite) {
        throw new BadRequestError(ImmobileErrors.IMMOBILE_IS_ALREADY_FAVORITED);
      }
      const favorite = await this._favoriteRepository.create(immobileId, userId );
      return favorite;
    } catch (e) {
      console.error(e);
      throw new InternalServerError(GenericErrors.SERVER_ERROR);
    }
  }

  public async unfavoriteImmobile(immobileId: string, userId: string): Promise<FavoriteImmobile> {
    try {
      const existingFavorite = await this._favoriteRepository.checkIfImmobileIsFavorite(immobileId, userId);

      if (!existingFavorite) {
        throw new BadRequestError(ImmobileErrors.IMMOBILE_IS_NOT_FAVORITED);
      }
      const favorite = await this._favoriteRepository.delete(userId, immobileId);

      return favorite;

    } catch (e) {
      console.error(e);
      throw new InternalServerError(GenericErrors.UNKNOWN_ERROR);
    }
  }
}

export default ImmobileService;