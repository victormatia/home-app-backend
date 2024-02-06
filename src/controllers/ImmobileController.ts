import { NextFunction, Request, Response } from 'express';
import { CreateImmobileDTO, UpdateImmobileDTO } from '../interfaces/ImmobileDto';
import ImmobileService from '../services/ImmobileService';

class ImmobileController {
  private _service: ImmobileService;
  
  constructor(service: ImmobileService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateImmobileDTO = req.body;
    try {
      const result  = await this._service.create(data);
      return res.status(201).json(result);
    } catch(err) {
      return next(err);
    }
  };
  
  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result  = await this._service.getAll();
      return res.status(200).json(result);
    } catch(err) {
      return next(err);
    }
  }; 

  public getImmobileById = async (_req: Request, res: Response, next: NextFunction) => {
    const { id } = _req.params;
    try {
      const result = await this._service.getImmobileById(id);
      return res.status(200).json(result);
    } catch(err) {
      return next(err);
    }
  }; 

  public deleteImmobileById = async (_req: Request, res: Response, next: NextFunction) => {
    const { id } = _req.params;
    try {
      const result = await this._service.deleteImmobileById(id);
      return res.status(200).json(result);
    } catch(err) {
      return next(err);
    }
  };
  
  public updateImmobileById = async (_req: Request, res: Response, next: NextFunction) => {
    const { id } = _req.params;
    try {
      const immobileInfo: UpdateImmobileDTO = _req.body; 
      const result = await this._service.updateImmobileById(id, immobileInfo); 
      return res.status(200).json(result);
    } catch(err) {
      return next(err);
    }
  };

}

export default  ImmobileController;
