import { NextFunction, Request, Response } from 'express';
import { CreateImmobileDTO, UpdateImmobileDTO } from '../interfaces/ImmobileDto';
import ImmobileService from '../services/ImmobileService';

class ImmobileController {
  private _service: ImmobileService;

  constructor(service: ImmobileService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateImmobileDTO = req.body;
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
    try {
      const { id } = req.params;
      const result = await this._service.getImmobileById(id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public deleteImmobileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this._service.deleteImmobileById(id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  public updateImmobileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const immobileInfo: UpdateImmobileDTO = req.body;
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
