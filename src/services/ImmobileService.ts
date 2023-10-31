import { Immobile, PrismaClient } from '@prisma/client';
import IService from '../interfaces/IService';

class ImmobileService {
  private _model: PrismaClient;

  constructor(model: PrismaClient) {
    this._model = model;
  }

  public async create(infos: Immobile): Promise<IService<Immobile>> {
    try {
      const registeredImmobile = await this._model.immobile.create({data: infos});

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
}

export default ImmobileService;