import { User } from '@prisma/client';
import { Chance } from 'chance';
import { CreateUserDTO } from '../../interfaces/UserDto';

class MockGenerator {
  
  private _chance;
  
  constructor() {
    this._chance = new Chance();
  }


  generateCreateUserDTO(): CreateUserDTO {
    return {
      id: this._chance.guid(),
      name: this._chance.name(),
      cpf: this._chance.cpf(),
      email: this._chance.email(),
      birthDate: this._chance.birthday(),
      password: this._chance.string({ length: 8, symbols: true, alpha: true }),
    };
  }

  geneateUserFromCreateUserDTO(createUserDto: CreateUserDTO): User {
    return {
      ...createUserDto,
      createdAt: this._chance.date(),
      updatedAt: this._chance.date(),
    };
  }
}

export default MockGenerator;