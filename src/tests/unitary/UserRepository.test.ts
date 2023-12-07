import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import sinon from 'sinon';
import UserRepository from '../../repository/UserRepository';
import { createUserDataMock } from '../util/fakeData';
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
      const {createUserDtoMock, userCreatedMock} = createUserDataMock();
      prismaMock.user.create.resolves(userCreatedMock);
      
      const userCreated = await userRepository.create(createUserDtoMock);
      
      expect(prismaMock.user.create.calledOnce).to.be.true;
    
      expect(userCreated).to.be.deep.equal(userCreatedMock);

    });

  });
});