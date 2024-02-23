import { NextFunction, Request, Response } from 'express';
import { CreateImmobile } from '../interfaces/IImmobile';
import ImmobileService from '../services/ImmobileService';

class ImmobileController {
  private _service: ImmobileService;

  constructor(service: ImmobileService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateImmobile = req.body;
    try {
      const result = await this._service.create(data);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._service.getAll();
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public getImmobileById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this._service.getImmobileById(id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public deleteImmobileById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this._service.deleteImmobileById(id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public updateImmobileById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const immobileInfo: CreateImmobile = req.body;
      const result = await this._service.updateImmobileById(id, immobileInfo);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public favoriteImmobile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { immobileId, userId } = req.body;
      const result = await this._service.favoriteImmobile(immobileId, userId);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  public unfavoriteImmobile = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { immobileId, userId } = req.body;
      const result = await this._service.unfavoriteImmobile(immobileId, userId);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

}

export default ImmobileController;
