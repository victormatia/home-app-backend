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

  // public async getAll(): Promise<IService<User[]>> { // Esse método é necessário?
  //   try {
  //     const users = await this._model.user.findMany();

  //     return { result: users };

  //   } catch (e) {
  //     console.error(e);
  //     return { message: 'Something went wrong' };
  //   }
  // }

  public async login(userEmail: string): Promise<IService<string>> {
    try {
      const user = await this._model.user.findUnique({ where: { email: userEmail } });

      if(!user) {
        return { message: 'User not found' };
      }

      const token = Jwt.createToken(user);

      return { result: token };

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong, user not found' };
    }
  }
}

export default UserService;
