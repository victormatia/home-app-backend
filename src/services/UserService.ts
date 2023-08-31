import { User, PrismaClient } from '@prisma/client';
import IService from '../interfaces/IService';

class UserService {
  private _model: PrismaClient;

  constructor(model: PrismaClient) {
    this._model = model;
  }

  public async create(infos: User): Promise<IService<User>> {
    try {
      const result = await this._model.user.create({data: infos});

      return {result};

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong, user was not registered' };
    }
  }
}

export default UserService;
