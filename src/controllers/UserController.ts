import { User } from '@prisma/client';
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
    const { message, result } = await this._service.create(data);

    return message ? res.status(400).json({ message })
      : res.status(201).json( result );
  };

  public login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { message, result } = await this._service.login(email);

    return message ? res.status(404).json({ message })
      : res.status(200).json( result );
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const users = await this._service.getAll();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json({ message: 'Somthing went wrong' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this._service.findById(id);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(404).json({ message: 'User does not exist' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data: Partial<User> = req.body;
      const user = await this._service.update(id, data);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(404).json({ message: 'User does not exist' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this._service.delete(id);
      return res.status(200).json({ message: 'User deleted' });
    } catch (e) {
      return res.status(404).json('User does not exist');
    }
  };

  public purge = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this._service.purge(id);
      return res.status(200).json('User permanently deleted');
    } catch (e) {
      return res.status(404).json('User does not exist');
    }
  };

  public activate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this._service.activate(id);
      return res.status(200).json('User activated');
    } catch (e) {
      return res.status(404).json('User does not exist');
    }
  };

}

export default UserController;

