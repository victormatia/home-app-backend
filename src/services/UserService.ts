import { User } from '@prisma/client';
import { InternalServerError } from '../error/InternalServerError';
import { NotFoundError } from '../error/NotFoundError';
import { CreateUserDTO, UniqueUserDTO, UpdateUserDTO } from '../interfaces/UserDto';
import UserRepository from '../repository/UserRepository';
import { GenericErrors, UserErrors } from '../util/messages';

class UserService {


  constructor(private _repository: UserRepository) {
  }

  public async create(data: CreateUserDTO): Promise<{userId: string}> {
    try {
      const user = await this._repository.create(data);
      
      const userId =  user.id;
      
      return { userId };

    } catch (err) {
      console.log(err);
      throw new InternalServerError(UserErrors.USER_NOT_REGISTERED);
    }
  }

  public async login(userEmail: string) {
    try {
      const user = await this._repository.findByEmail(userEmail);
  
      if (!user) {
        throw new NotFoundError(UserErrors.USER_NOT_FOUND);
      }
  
      return { userId: user.id };

    } catch (err) {
      throw new InternalServerError(GenericErrors.SERVER_ERROR);

    } 
  }

  public async getAll(): Promise<User[]> {
    return this._repository.getAll();
  }

  public async findById(id: string): Promise<UniqueUserDTO> {
    const user = await this._repository.findById(id, true);
    if(!user) {
      throw new NotFoundError(UserErrors.USER_NOT_FOUND);
    }
    return user;
  }

  public async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      return this._repository.update(id, data);
    } catch(err) {
      throw new NotFoundError(UserErrors.USER_NOT_FOUND);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._repository.delete(id);
    } catch(err) {
      throw new NotFoundError(UserErrors.USER_NOT_FOUND);
    }
  }

  public async purge(id: string): Promise<void> {
    try {
      await this._repository.purge(id);
    } catch(err) {
      throw new NotFoundError(UserErrors.USER_NOT_FOUND);
    }
  }

  public async activate(id: string): Promise<void> {
    try {
      await this._repository.activate(id);
    } catch(err) {
      throw new NotFoundError(UserErrors.USER_NOT_FOUND);
    }
  }
}

export default UserService;
