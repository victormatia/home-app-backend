import { PrismaClient } from '@prisma/client';
import ImmobileRepository from '../repository/ImmobileRepository';
import ImmobileService from '../services/ImmobileService';
import { PermissionValidator } from './PermissionValidator';

export class ImmobilePermissionValidator extends PermissionValidator{

  private _immobileRepository: ImmobileRepository;
  private _immobileService: ImmobileService;

  constructor(id: string, tokenUserId: string ) {
    super(id, tokenUserId);
    this._immobileRepository = new ImmobileRepository(new PrismaClient());
    this._immobileService = new ImmobileService(this._immobileRepository);
  }
  validate() {
    return this._immobileService.checkOwnership(this._id, this._tokenUserId);
  }

}