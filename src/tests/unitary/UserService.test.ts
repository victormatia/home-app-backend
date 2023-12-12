import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import sinon from 'sinon';
import Jwt from '../../auth/Jwt';
import { CreateUserDTO } from '../../interfaces/UserDto';
import UserRepository from '../../repository/UserRepository';
import UserService from '../../services/UserService';

describe('Testing Service Layer - Unit Test', () => {

  let userService: UserService;
  before(() => {
    const userRepository = new UserRepository({} as PrismaClient);
    
    userService = new UserService(userRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing service create method', () => {
    
    it('Should return a json web token if user is created', async () => {
      const tokenMock = 'Token mock';
      
      const createUserStub = sinon.stub(UserRepository.prototype, 'create').resolves();
      const generateTokenStub = sinon.stub(Jwt, 'createToken').returns(tokenMock);
      
      const serviceResponse = await userService.create({} as CreateUserDTO);

      sinon.assert.calledOnce(createUserStub);
      sinon.assert.calledOnce(generateTokenStub);


      expect(serviceResponse.result).to.be.equal(tokenMock);
    });
    it('Should return an error message if user is not created', async () => {
      const createUserStub = sinon.stub(UserRepository.prototype, 'create').rejects();

      const errorMessage = await userService.create({} as CreateUserDTO);
      sinon.assert.calledOnce(createUserStub);

      expect(errorMessage.message).to.be.equal('Something went wrong, user was not registered');
      
    });

  });
});