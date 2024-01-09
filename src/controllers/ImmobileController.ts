import { Request, Response } from 'express';
import ImmobileService from '../services/ImmobileService';

class ImmobileController {
  private _service: ImmobileService;
  
  constructor(service: ImmobileService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response) => {
    const  { message, result } = await this._service.create(req.body);

    return message ? res.status(400).json({ message }) 
      : res.status(201).json(result);
  };
  
  public getAll = async (_req: Request, res: Response) => {
    const  { message, result } = await this._service.getAll();

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  }; 

  public getImmobileById = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const  { message, result } = await this._service.getImmobileById(id);

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  }; 

  public deleteImmobileById = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const  { message, result } = await this._service.deleteImmobileById(id);

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  };
  
  public updateImmobileById = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const immobileInfo = _req.body; 
    const  { message, result } = await this._service.updateImmobileById(id, immobileInfo); 

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  };

}

export default  ImmobileController;
