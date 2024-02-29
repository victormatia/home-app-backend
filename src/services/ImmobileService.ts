import { Immobile } from '@prisma/client';
import ImmobileRepository from '../repository/ImmobileRepository';

import { FavoriteImmobile } from '@prisma/client';
import { BadRequestError } from '../error/BadRequestError';
import { InternalServerError } from '../error/InternalServerError';
import { NotFoundError } from '../error/NotFoundError';
import { CreateImmobileDTO, UpdateImmobileDTO } from '../interfaces/ImmobileDto';
import { FavoriteRepository } from '../repository/FavoriteRepository';
import { GenericErrors, ImmobileErrors } from '../util/messages';


class ImmobileService {


  constructor(private _repository: ImmobileRepository, private _favoriteRepository: FavoriteRepository) {
  }

  public async create(immobileInfo: CreateImmobileDTO): Promise<Immobile> {
    try {


      const registeredImmobile = await this._repository.create(immobileInfo);
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
    const immobile = await this._repository.findById(id);

    if (immobile === null) {
      throw new NotFoundError(ImmobileErrors.IMMOBILE_NOT_FOUND);
    }
    return immobile;

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
 

  public async updateImmobileById(id: string, immobileInfo: UpdateImmobileDTO ): Promise<Immobile> {
   

    const existingImmobile = await this._repository.findById(id);
    if (!existingImmobile) {
      throw new NotFoundError(ImmobileErrors.ADDRESS_NOT_FOUND);
    }
    

    const updatedImmobile = await this._repository.update(id, immobileInfo);

    return updatedImmobile;
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