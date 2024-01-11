import { User } from '@prisma/client';
import { Chance } from 'chance';
import { CreateUserDTO } from '../../interfaces/UserDto';

const chance = new Chance();
class MockGenerator {
  
  static generateFakeCreateUserDTO(): CreateUserDTO {
    return {
      id: chance.guid(),
      name: chance.name(),
      cpf: chance.cpf(),
      email: chance.email(),
      birthDate: chance.birthday(),
      password: chance.string({ length: 8, symbols: true, alpha: true }),
      
    };
  }

  static generateFakeUser(): User {
    const userData = this.generateFakeCreateUserDTO();
    return {
      ...userData,
      createdAt: chance.date(),
      updatedAt: chance.date(),
    };
  }

  static generateListOfFakeUsers(length: number): User[] {
    return Array.from({length}, () => this.generateFakeUser());
  }

  static generateFakeId() {
    return chance.guid();
  }

  static generateFakeEmail() {
    return chance.email();
  }
}
export default MockGenerator;