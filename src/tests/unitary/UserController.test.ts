import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import UserController from '../../controllers/UserController';
import IService from '../../interfaces/IService';
import UserRepository from '../../repository/UserRepository';
import UserService from '../../services/UserService';

describe('Testing Controller Layer - Unit Test', () => {

  let userController: UserController;
  const req = {} as Request;
  // let res: Response;
  
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
      
      
      const serviceResponse: IService<string> = {result: 'Token mock'};
      const serviceStub = sinon.stub(UserService.prototype, 'create').resolves(serviceResponse);
      const res = {status: sinon.stub(), json: sinon.stub()};
      res.status.returnsThis();
      
      await userController.create(req, res as unknown as Response);

      sinon.assert.calledOnce(serviceStub);
      

      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledWith({token: serviceResponse.result})).to.be.true;

    });
    it('Should return a response with status 400 and error message if user is not created', async () => {
      // const createUserStub = sinon.stub(UserRepository.prototype, 'create').rejects();

      // const errorMessage = await userService.create({} as CreateUserDTO);
      // sinon.assert.calledOnce(createUserStub);

      // expect(errorMessage.message).to.be.equal('Something went wrong, user was not registered');
      
    });

  });
});