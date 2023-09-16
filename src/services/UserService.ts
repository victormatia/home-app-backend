import { User, PrismaClient } from '@prisma/client';
import IService from '../interfaces/IService';
import Jwt from '../auth/Jwt';

class UserService {
  private _model: PrismaClient;

  constructor(model: PrismaClient) {
    this._model = model;
  }

  public async create(infos: User): Promise<IService<string>> {
    try {
      await this._model.user.create({data: infos});

      const token = Jwt.createToken({...infos});

      return { result: token };

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong, user was not registered' };
    }
  }
}

export default UserService;
