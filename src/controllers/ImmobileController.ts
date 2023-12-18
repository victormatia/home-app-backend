import { RequestHandler } from 'express';
import ImmobileService from '../services/ImmobileService';

class ImmobileController {
  private _service: ImmobileService;
  
  constructor(service: ImmobileService) {
    this._service = service;
  }

  public create: RequestHandler = async (req, res) => {
    const  { message, result } = await this._service.create(req.body);

    return message ? res.status(400).json({ message }) 
      : res.status(201).json(result);
  };
  
  public getAll: RequestHandler = async (_req, res) => {
    const  { message, result } = await this._service.getAll();

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  }; 

  public getImmobileById: RequestHandler = async (_req, res) => {
    const { id } = _req.params;
    const  { message, result } = await this._service.getImmobileById(id);

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  }; 
}

export default  ImmobileController;
