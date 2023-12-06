import { User } from '@prisma/client';
import Jwt from '../auth/Jwt';
import IService from '../interfaces/IService';
import { CreateUserDTO } from '../interfaces/UserDto';
import UserRepository from '../repository/UserRepository';

class UserService {
  

  constructor(private _repository: UserRepository) {
  }

  public async create(data: CreateUserDTO): Promise<IService<string>> {
    try {
      await this._repository.create(data);

      const token = Jwt.createToken({...data});

      return { result: token };

    } catch (e) {
      // console.error(e);
      return { message: 'Something went wrong, user was not registered' };
    }
  }

  public async getAll(): Promise<IService<User[]>> { 
    try {
      const users = await this._repository.getAll();

      return { result: users };

    } catch (e) {
      console.error(e);
      return { message: 'Something went wrong' };
    }
  }

  public async login(userId: string): Promise<IService<string>> {
    try {
      const user = await this._repository.findUnique(userId);

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
