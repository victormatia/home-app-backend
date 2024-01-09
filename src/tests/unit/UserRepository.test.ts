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

      expect(prismaMock.user.create.calledWith({ data: createUserDto })).to.be.true;
      expect(userCreated).to.be.deep.equal(userCreatedMock);

    });
  });

  
  describe('Testing repository findByEmail method', () => {
    it('Should return a user if does exist', async () => {
      const mockedUser = MockGenerator.generateFakeUser();

      prismaMock.user.findUnique.resolves(mockedUser);

      const user = await userRepository.findByEmail(mockedUser.email);

      expect(prismaMock.user.findUnique.calledOnceWith({ where: { email: mockedUser.email } }));
      expect(user?.email).to.be.equal(mockedUser.email);
    });
    it('Should return null if user does not exist', async () => {
      const fakeEmail = MockGenerator.generateFakeEmail();
      prismaMock.user.findUnique.resolves(null);

      const user = await userRepository.findByEmail(fakeEmail);

      expect(prismaMock.user.findUnique.calledOnceWith({ where: { id: fakeEmail} }));
      expect(user).to.be.null;
    });
  });
});