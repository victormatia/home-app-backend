import { User } from '@prisma/client';
import { ManagementClient } from 'auth0';
import Jwt from '../auth/Jwt';
import { UserNotFoundError } from '../error/UserNotFoundError';
import { UserNotRegisteredError } from '../error/UserNotRegisteredError';
import IService from '../interfaces/IService';
import { CreateUserDTO, UniqueUserDTO, UpdateUserDTO } from '../interfaces/UserDto';
import UserRepository from '../repository/UserRepository';

class UserService {


  constructor(private _repository: UserRepository, private _managementClient: ManagementClient) {
  }

  public async create(data: CreateUserDTO): Promise<IService<string>> {
    try {
      const { auth_id, ...userData } = data;
      console.log(auth_id);
      await this._repository.create(userData);
      
      // const role = {roles: ['rol_lRwn8hIuXTG33tDq']};
      // const params = { id: auth_id };
      // await this._managementClient.users.assignRoles(params, role);
      // await this._managementClient.users.update(params, {user_metadata: {id: user.id}});

      const token = Jwt.createToken({ ...data });

      return { result: token };

    } catch (err) {
      console.log(err);
      throw new UserNotRegisteredError();
    }
  }

  public async login(userEmail: string): Promise<IService<string>> {
    try {
      const user = await this._repository.findByEmail(userEmail);

      if (!user) {
        throw new UserNotFoundError();
      }

      const token = Jwt.createToken(user);

      return { result: token };

    } catch (err) {
      throw new UserNotFoundError();
    }
  }

  public async getAll(): Promise<User[]> {
    return this._repository.getAll();
  }

  public async findById(id: string): Promise<UniqueUserDTO> {
    const user = await this._repository.findById(id, true);
    if(!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  public async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      return this._repository.update(id, data);
    } catch(err) {
      throw new UserNotFoundError();
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._repository.delete(id);
    } catch(err) {
      throw new UserNotFoundError();
    }
  }

  public async purge(id: string): Promise<void> {
    try {
      await this._repository.purge(id);
    } catch(err) {
      throw new UserNotFoundError();
    }
  }

  public async activate(id: string): Promise<void> {
    try {
      await this._repository.activate(id);
    } catch(err) {
      throw new UserNotFoundError();
    }
  }
}

export default UserService;
