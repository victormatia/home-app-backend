import { Request, Response } from 'express';
import { CreateUserDTO } from '../interfaces/UserDto';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;
  
  constructor(service: UserService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response) => {
    const data: CreateUserDTO = req.body;
    const  { message, result } = await this._service.create(data);

    return message ? res.status(400).json({ message }) 
      : res.status(201).json({ token: result });
  }; 

  public getAll = async (_req:Request, res: Response) => {
    const { message, result } = await this._service.getAll();

    return message ? res.status(400).json({ message }) 
      : res.status(200).json(result);
  };

  public login = async (req: Request, res: Response) => {
    const { id } = req.body;
    const { message, result } = await this._service.login(id);

    return message ? res.status(404).json({ message }) 
      : res.status(200).json({ token: result });
  };
}

export default UserController;

