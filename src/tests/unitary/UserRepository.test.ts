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
      const createUserDto = {} as CreateUserDTO;
      
      prismaMock.user.create.resolves(userCreatedMock);
      
      const userCreated = await userRepository.create(createUserDto);
      
      expect(prismaMock.user.create.calledWith({data: createUserDto})).to.be.true;
      expect(userCreated).to.be.deep.equal(userCreatedMock);

    });
  });

  describe('Tesing repository getAll methdod', () => {
    it('Should return a list of users', async () => {
      const lengthOfList = 5;
      const userListMock = MockGenerator.generateListOfFakeUsers(lengthOfList);

      prismaMock.user.findMany.resolves(userListMock);

      const listOfUsers = await userRepository.getAll();

      expect(prismaMock.user.findMany.calledOnce).to.be.true;
      expect(listOfUsers).to.have.length(lengthOfList);
      listOfUsers.forEach((user)=> {
        expect(user).to.be.have.property('id');
        expect(user).to.be.have.property('name');
        expect(user).to.be.have.property('email');
        expect(user).to.be.have.property('password');
        expect(user).to.be.have.property('birthDate');
        expect(user).to.be.have.property('createdAt');
        expect(user).to.be.have.property('updatedAt');
      });
    });
  });
});