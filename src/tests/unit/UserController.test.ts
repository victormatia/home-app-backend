import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import UserController from '../../controllers/UserController';
import IService from '../../interfaces/IService';
import UserRepository from '../../repository/UserRepository';
import UserService from '../../services/UserService';
import MockGenerator from '../util/MockGenerator';

describe('Testing Controller Layer - Unit Test', () => {

  let userController: UserController;
  let req = {} as Request;

  beforeEach(() => {
    const userRepository = new UserRepository({} as PrismaClient);
    const userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing controller create method', () => {

    it('Should return a response with status 201 and a json web token if the user is created', async () => {

      const serviceResponse: IService<string> = { result: 'Token mock' };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      const serviceCreateStub = sinon.stub(UserService.prototype, 'create').resolves(serviceResponse);

      await userController.create(req, res as unknown as Response);

      expect(serviceCreateStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledWith({ token: serviceResponse.result })).to.be.true;

    });

    it('Should return a response with status 400 and error message if user is not created', async () => {
      const serviceResponse: IService<string> = { message: 'Something went wrong, user was not registered' };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      const serviceCreateStub = sinon.stub(UserService.prototype, 'create').resolves(serviceResponse);

      await userController.create(req, res as unknown as Response);

      expect(serviceCreateStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(res.json.calledWith({ message: serviceResponse.message })).to.be.true;
    });
  });

  describe('Testing controller login method', () => {
    beforeEach(() => {
      req = { body: { email: MockGenerator.generateFakeEmail() } } as Request;
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Should return a token if login is completed', async () => {
      const serviceResponse: IService<string> = { result: 'Token mock' };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      const serviceLoginStub = sinon.stub(UserService.prototype, 'login').resolves(serviceResponse);

      await userController.login(req, res as unknown as Response);

      expect(serviceLoginStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledWith({ token: serviceResponse.result })).to.be.true;

    });

    it('Should return an error message if user not exists', async () => {
      const serviceResponse: IService<string> = { message: 'User not found' };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      const serviceLoginStub = sinon.stub(UserService.prototype, 'login').resolves(serviceResponse);

      await userController.login(req, res as unknown as Response);

      expect(serviceLoginStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User not found' })).to.be.true;

    });

    it('Should return an error message if an error occours', async () => {
      const serviceResponse: IService<string> = { message: 'Something went wrong, user not found' };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      const serviceLoginStub = sinon.stub(UserService.prototype, 'login').resolves(serviceResponse);

      await userController.login(req, res as unknown as Response);

      expect(serviceLoginStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Something went wrong, user not found' })).to.be.true;

    });
  });
});