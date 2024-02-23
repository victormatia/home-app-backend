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
  let statusStub: SinonStub;
  let jsonStub: SinonStub;

  beforeEach(() => {
    immobileService = new ImmobileService({} as PrismaClient); 
    immobileController = new ImmobileController(immobileService);
    req = {} as Request;
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

  describe('getImmobileById', () => {
    it('should get a specific immobile by ID and return 200 status code', async () => {
      const res = { 
        status: statusStub, 
        json: jsonStub,
      } as unknown as Response;
      const immobileId = '000';
      const expectedStatusCode = 200;
      
  
      const expectedResult: Immobile | undefined = ImmobileList.find((immobile) => immobile.id === immobileId);
  
      sinon.stub(immobileService, 'getImmobileById').withArgs(immobileId).resolves({ result: expectedResult });
  
      const req = { params: { id: immobileId } } as unknown as Request;
  
      await immobileController.getImmobileById(req, res, sinon.stub() as unknown as NextFunction);
       
      expect(statusStub.calledWith(expectedStatusCode)).to.be.true;
      expect(jsonStub.calledWith(expectedResult)).to.be.true;
        
      sinon.restore(); 
    });
   
    it('should handle error for invalid ID and return 400 status code', async () => {
      const res = { 
        status: statusStub, 
        json: jsonStub,
      } as unknown as Response;
      
      const immobileId = '8000';
      const expectedResult = 'Immobile not found';
  
      sinon.stub(immobileService, 'getImmobileById').withArgs(immobileId).resolves({ message: expectedResult });
  
      const req = { params: { id: immobileId } } as unknown as Request;
  
      await immobileController.getImmobileById(req, res, sinon.stub() as unknown as NextFunction);
       
      // console.log('RESULT:', expectedResult);
      // console.log('Status Stub Calls:', statusStub.args);
     
      expect(statusStub.calledOnceWith(400)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true; 
      sinon.restore(); 
    });
  
  
  });

  describe('updateImmobileById', () => {
    it('should get and update immobile by ID with 200 status code', async () => {
      const res = { 
        status: statusStub, 
        json: jsonStub,
      } as unknown as Response;
      const immobileId = '002';
      const expectedStatusCode = 200;

      const immobileToUpdate: Immobile | undefined = ImmobileList.find((immobile) => immobile.id === immobileId);
      
  
      const expectedResult: Immobile | undefined = ImmobileList.find((immobile) => immobile.id === immobileId);
  
      sinon.stub(immobileService, 'updateImmobileById').withArgs(immobileId).resolves({ result: expectedResult });
  
      const req = { params: { id: immobileId } } as unknown as Request;
  
      await immobileController.updateImmobileById(req, res, sinon.stub() as unknown as NextFunction);
       
      expect(statusStub.calledWith(expectedStatusCode)).to.be.true;
      expect(jsonStub.calledWith(immobileToUpdate)).to.be.true;
        
      sinon.restore(); 
    });
    
    // it('should handle error and return 400 status code', async () => {
    //   const id = '1';
    //   const immobileInfo = { /* immobile info */ };
    //   const expectedErrorMessage = 'Error message';
    //   const expectedStatusCode = 400;

    //   req.params = { id };
    //   req.body = immobileInfo;

    //   sinon.stub(immobileService, 'updateImmobileById').resolves({ message: expectedErrorMessage });

    //   await immobileController.updateImmobileById(req, res);

    //   expect(statusStub.calledWith(expectedStatusCode)).to.be.true;
    //   expect(jsonStub.calledWith({ message: expectedErrorMessage })).to.be.true;
    // });
  });


  describe('deleteImmobileById', () => {
    it('should delete a specific immobile by ID and return 200 status code', async () => {
      const res = { 
        status: statusStub, 
        json: jsonStub,
      } as unknown as Response;
      const immobileId = '002';
      const expectedStatusCode = 200;
      
  
      const expectedResult: Immobile | undefined = ImmobileList.find((immobile) => immobile.id === immobileId);
  
      sinon.stub(immobileService, 'deleteImmobileById').withArgs(immobileId).resolves({ result: expectedResult });
  
      const req = { params: { id: immobileId } } as unknown as Request;
  
      await immobileController.deleteImmobileById(req, res, sinon.stub() as unknown as NextFunction);
       
      expect(statusStub.calledWith(expectedStatusCode)).to.be.true;
      expect(jsonStub.calledWith(expectedResult)).to.be.true;
        
      sinon.restore(); 
    });
   
    // it('should handle error for invalid ID and return 400 status code', async () => {
    //   const res = { 
    //     status: statusStub, 
    //     json: jsonStub,
    //   } as unknown as Response;
      
    //   const immobileId = '8000';
    //   const expectedResult = 'Immobile not found';
  
    //   sinon.stub(immobileService, 'getImmobileById').withArgs(immobileId).resolves({ message: expectedResult });
  
    //   const req = { params: { id: immobileId } } as unknown as Request;
  
    //   await immobileController.deleteImmobileById(req, res, sinon.stub() as unknown as NextFunction);
       
    //   // console.log('RESULT:', expectedResult);
    //   // console.log('Status Stub Calls:', statusStub.args);
     
    //   expect(statusStub.calledOnceWith(400)).to.be.true;
    //   expect(jsonStub.calledOnce).to.be.true; 
    //   sinon.restore(); 
    // });
  
  
  });
});
