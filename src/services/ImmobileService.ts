import { Immobile } from '@prisma/client';
import { ImmobileIncompleteInfoError } from '../error/ImmobileIncompleteInfoError';
import { ImmobileNotFoundError } from '../error/ImmobileNotFoundError';
import { CreateImmobileDTO, UpdateImmobileDTO } from '../interfaces/ImmobileDto';
import ImmobileRepository from '../repository/ImmobileRepository';

class ImmobileService {
  

  constructor(private _repository: ImmobileRepository) {
  }

  public async create(immobileInfo: CreateImmobileDTO): Promise<Immobile> {
    const registeredImmobile = await this._repository.create(immobileInfo);
    return registeredImmobile;
  }

  public async getAll(): Promise<Immobile[]> {

    const allImmobiles = await this._repository.getAll();
    return allImmobiles;
  }

  public async getImmobileById(id: string): Promise<Immobile>
  {

    const immobile = await this._repository.findById(id);
    if(!immobile) {
      throw new ImmobileNotFoundError();
    }
    return immobile;

  }

  public async deleteImmobileById(id: string): Promise<Immobile> {
    try {
      const immobile = await this._repository.delete(id);
      return immobile;
    } catch (err) {
      throw new ImmobileNotFoundError();
    }
  }

  public async updateImmobileById(id: string, immobileInfo: UpdateImmobileDTO): Promise<Immobile> {
    const { ownerId, addressId, typeId } = immobileInfo;
  
    if (ownerId === undefined || addressId === undefined || typeId === undefined) {
      throw new ImmobileIncompleteInfoError();
    }
  
    const updatedImmobile = this._repository.update(id, immobileInfo);
  
    return updatedImmobile;
  }

  public checkOwnership(immobileId: string, ownerId: string) {
    try {
      this._repository.findByIdAndOwnerId(immobileId, ownerId);
      return true;
    } catch(err) {
      return false;
    }
  }
}

export default ImmobileService;