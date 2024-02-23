import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UpdateUserDTO } from '../interfaces/UserDto';
import UserService from '../services/UserService';
import { UserSuccess } from '../util/messages';

class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateUserDTO = req.body;
      const user = await this._service.create(data);
      return res.status(201).json(user);
    } catch(err) {
      return next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as {email: string};
    try {
      const token = await this._service.login(email);
      return res.status(200).json({token});
    } catch(err) {
      return next(err);
    }
  };

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._service.getAll();
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this._service.findById(id);
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data: UpdateUserDTO = req.body;
      const user = await this._service.update(id, data);
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this._service.delete(id);
      return res.status(200).json({ message: UserSuccess.USER_DELETED });
    } catch (err) {
      return next(err);
    }
  };

  public purge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this._service.purge(id);
      return res.status(200).json({message: UserSuccess.USER_PURGED});
    } catch (err) {
      return next(err);
    }
  };

  public activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this._service.activate(id);
      return res.status(200).json({message: UserSuccess.USER_ACTIVATED});
    } catch (err) {
      return next(err);
    }
  };

}

export default UserController;

