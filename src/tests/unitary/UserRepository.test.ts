import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import sinon from 'sinon';
import { CreateUserDTO } from '../../interfaces/UserDto';
import UserRepository from '../../repository/UserRepository';
import MockGenerator from '../util/MockGenerator';
import prismaMock from '../util/prismaMock';

describe('Testing User Repository Layer - Unit Test', () => {
  
  let userRepository: UserRepository;

  before(() => {
    userRepository = new UserRepository(prismaMock as unknown as PrismaClient);

  });
  afterEach(() => {
    sinon.restore();
  });
  describe('Testing repository create method', () => {
    
    
    it('Should create a user successfully', async () => {
      const userCreatedMock = MockGenerator.generateFakeUser();
      prismaMock.user.create.resolves(userCreatedMock);
      
      const userCreated = await userRepository.create({} as CreateUserDTO);
      
      expect(prismaMock.user.create.calledOnce).to.be.true;
    
      expect(userCreated).to.be.deep.equal(userCreatedMock);

    });

  });
});