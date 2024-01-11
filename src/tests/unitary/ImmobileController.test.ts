import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express'; // Import NextFunction from 'express'
import sinon, { SinonStub } from 'sinon';
import ImmobileController from '../../controllers/ImmobileController';
import ImmobileService from '../../services/ImmobileService';
import ImmobileList from './ImmobileList.mock';
import { PrismaClient } from '@prisma/client';
import { Immobile } from '../../interfaces/IImmobile';

describe('Test Immobile Controller layer', () => {
  let immobileController: ImmobileController;
  let immobileService: ImmobileService;
  let req: Request;
  // let res: Response;
  let statusStub: SinonStub;
  let jsonStub: SinonStub;

  beforeEach(() => {
    immobileService = new ImmobileService({} as PrismaClient); 
    immobileController = new ImmobileController(immobileService);
    req = {} as Request;
    // res = {
    //   status: statusStub,
    //   json: jsonStub,
    // } as unknown as Response;
    statusStub = sinon.stub().returnsThis();
    jsonStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });


  describe('getAll', () => {
    it('should get all immobiles and return 200 status code', async () => {
      const res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const expectedResult: Immobile[] = ImmobileList;
      const expectedStatusCode = 200;
     

      sinon.stub(immobileService, 'getAll').resolves({ result: expectedResult });

      await immobileController.getAll(req, res, sinon.stub() as unknown as NextFunction); 
      // console.log(expectedStatusCode);
      // console.log(expectedResult);

      expect(statusStub.calledWith(expectedStatusCode)).to.be.true;
      expect(jsonStub.calledWith(expectedResult)).to.be.true;
    });

    it('should handle error and return 400 status code', async () => {
      const res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const expectedErrorMessage = 'Error message';
      const expectedStatusCode = 400;

      sinon.stub(immobileService, 'getAll').resolves({ message: expectedErrorMessage });

      await immobileController.getAll(req, res, sinon.stub() as unknown as NextFunction); 

      expect(statusStub.calledWith(expectedStatusCode)).to.be.true;
      expect(jsonStub.calledWith({ message: expectedErrorMessage })).to.be.true;
    });
  });
});