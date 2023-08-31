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
      : res.status(201).json({ result });
  }; 
}

export default UserController;

