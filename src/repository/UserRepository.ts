import { PrismaClient, User } from '@prisma/client';
import { UserCreateDTO } from '../interfaces/UserDto';


class UserRepository {
  private _model: PrismaClient;
  
  constructor(prismaClient: PrismaClient) {
    this._model = prismaClient;
  }

  async create(data: UserCreateDTO): Promise<User> {
    return await this._model.user.create({data});
  }

  async getAll():Promise<User[]> {
    return this._model.user.findMany();
  }
  async findUnique( id: string ): Promise<User | null> {
    return this._model.user.findUnique({where: {id}});
  }
}


export default UserRepository;