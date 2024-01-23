import { User } from '@prisma/client';
import Jwt from '../auth/Jwt';
import IService from '../interfaces/IService';
import { CreateUserDTO, UniqueUserDTO } from '../interfaces/UserDto';
import UserRepository from '../repository/UserRepository';

class UserService {


  constructor(private _repository: UserRepository) {
  }

  public async create(data: CreateUserDTO): Promise<IService<{token: string, userId: string}>> {
    try {
      const user = await this._repository.create(data);
      
      const token = Jwt.createToken({ ...data });
      const userId =  user.id;
      
      return { result: {token, userId} };

    } catch (e) {
      // console.error(e);
      return { message: 'Something went wrong, user was not registered' };
    }
  }

  public async login(userEmail: string): Promise<IService<{token: string, userId: string}>> {
    try {
      const user = await this._repository.findByEmail(userEmail);
  
      if (!user) {
        return { message: 'User not found' };
      }
  
      const token = Jwt.createToken(user);
      const userId =  user.id;
  
      return { result: {token, userId} };
  
    } catch (e) {
      // console.error(e);
      return { message: 'Something went wrong, user not found' };
    }
  }

  public async getAll(): Promise<User[]> {

    return this._repository.getAll();
  }

  public async findById(id: string): Promise<UniqueUserDTO> {
    const user = await this._repository.findById(id, true);
    if(!user) {
      throw new Error('User does not exist');
    }
    return user;
  }

  public async update(id: string, data: Partial<User>): Promise<User> {
    return this._repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this._repository.delete(id);
  }

  public async purge(id: string): Promise<void> {
    await this._repository.purge(id);
  }

  public async activate(id: string): Promise<void> {
    await this._repository.activate(id);
  }
}

export default UserService;
