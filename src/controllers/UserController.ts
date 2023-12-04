import { RequestHandler } from 'express';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;
  
  constructor(service: UserService) {
    this._service = service;
  }

  public create: RequestHandler = async (req, res) => {
    const  { message, result } = await this._service.create(req.body);

    return message ? res.status(400).json({ message }) 
      : res.status(201).json({ token: result });
  }; 

  // public getAll: RequestHandler = async (_req, res) => {
  //   const { message, result } = await this._service.getAll();

  //   return message ? res.status(400).json({ message }) 
  //     : res.status(200).json(result);
  // };

  public login: RequestHandler = async (req, res) => {
    const { email } = req.body;
    const { message, result } = await this._service.login(email);

    return message ? res.status(404).json({ message }) 
      : res.status(200).json({ token: result });
  };
}

export default UserController;

