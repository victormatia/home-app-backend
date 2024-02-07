import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

export function userCreationMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1] as string;
  const info = decode(token, {complete: true});
  req.body = {...req.body, id:'TESTE'};
  console.log(info);
  return next();
}