import { User } from '@prisma/client';
import { CreateUserDTO } from '../../interfaces/UserDto';
import MockGenerator from './MockGenerator.test';


const mockgenerator = new MockGenerator();

type UserMokcData ={
  createUserDtoMock: CreateUserDTO,
    userCreatedMock: User,
}

export function createUserDataMock(): UserMokcData {
  const createUserDto = mockgenerator.generateCreateUserDTO();
  const userCreated = mockgenerator.geneateUserFromCreateUserDTO(createUserDto);
  return {
    createUserDtoMock: createUserDto,
    userCreatedMock: userCreated,
  };
}