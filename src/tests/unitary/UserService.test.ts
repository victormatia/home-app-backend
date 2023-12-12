import { PrismaClient, User } from '@prisma/client';
import { expect } from 'chai';
import sinon from 'sinon';
import Jwt from '../../auth/Jwt';
import { CreateUserDTO } from '../../interfaces/UserDto';
import UserRepository from '../../repository/UserRepository';
import UserService from '../../services/UserService';
import MockGenerator from '../util/MockGenerator';

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
      const fakeCreateUserDto = MockGenerator.generateFakeCreateUserDTO();

      const createUserStub = sinon.stub(UserRepository.prototype, 'create').resolves({} as User);
      const generateTokenStub = sinon.stub(Jwt, 'createToken').returns(tokenMock);

      const serviceResponse = await userService.create(fakeCreateUserDto);

      expect(createUserStub.calledOnceWith(fakeCreateUserDto)).to.be.true;
      expect(generateTokenStub.calledOnceWith(fakeCreateUserDto)).to.be.true;
      expect(serviceResponse.result).to.be.equal(tokenMock);
    });

    it('Should return an error message if user is not created', async () => {
      const createUserStub = sinon.stub(UserRepository.prototype, 'create').rejects();

      const errorMessage = await userService.create({} as CreateUserDTO);

      expect(createUserStub.calledOnce).to.be.true;
      expect(errorMessage.message).to.be.equal('Something went wrong, user was not registered');

    });
  });

  describe('Tesing service getAll methdod', () => {
    it('Should return a token if login is completed', async () => {
      const lengthOfList = 5;
      const userListMock = MockGenerator.generateListOfFakeUsers(lengthOfList);

      const getAllUsersStub = sinon.stub(UserRepository.prototype, 'getAll').resolves(userListMock);

      const errorMessage = await userService.getAll();

      expect(getAllUsersStub.calledOnce).to.be.true;
      expect(errorMessage.result).to.be.deep.equal(userListMock);

    });

    it('Should return a erro message if is not possible to get a list of users', async () => {
      const getAllUsersStub = sinon.stub(UserRepository.prototype, 'getAll').rejects();

      const errorMessage = await userService.getAll();

      expect(getAllUsersStub.calledOnce).to.be.true;
      expect(errorMessage.message).to.be.equal('Something went wrong');
    });
  });

  describe('Testing service login method', () => {

    it('Should return a json web token if user is created', async () => {
      const tokenMock = 'Token mock';
      const fakeId = MockGenerator.generateFakeId();
      const fakeUser = MockGenerator.generateFakeUser();

      const getUserByIdStub = sinon.stub(UserRepository.prototype, 'getUserById').resolves(fakeUser);
      const generateTokenStub = sinon.stub(Jwt, 'createToken').returns(tokenMock);

      const serviceResponse = await userService.login(fakeId);

      expect(getUserByIdStub.calledOnceWith(fakeId)).to.be.true;
      expect(generateTokenStub.calledWith(fakeUser)).to.be.true;
      expect(serviceResponse.result).to.be.equal(tokenMock);
    });

    it('Should return an error message if user is not found', async () => {
      const fakeId = MockGenerator.generateFakeId();

      const getUserByIdStub = sinon.stub(UserRepository.prototype, 'getUserById').resolves(null);
      const generateTokenStub = sinon.stub(Jwt, 'createToken');
      
      const errorMessage = await userService.login(fakeId);

      expect(getUserByIdStub.calledOnceWith(fakeId)).to.be.true;
      expect(generateTokenStub.notCalled).to.be.true;
      expect(errorMessage.message).to.be.equal('User not found');
    });

    it('Should return an error message if an error is caught at the service', async () => {
      const fakeId = MockGenerator.generateFakeId();

      const getUserByIdStub = sinon.stub(UserRepository.prototype, 'getUserById').rejects();
      const generateTokenStub = sinon.stub(Jwt, 'createToken');
      
      const errorMessage = await userService.login(fakeId);

      expect(getUserByIdStub.calledOnceWith(fakeId)).to.be.true;
      expect(generateTokenStub.notCalled).to.be.true;
      expect(errorMessage.message).to.be.equal('Something went wrong, user not found');
    });
  });
});