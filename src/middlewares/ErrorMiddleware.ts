import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { GenericErrors } from '../util/messages';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ApiError) {
    console.log(err);
    return res.status(err.status).json({message: err.message});
  }
  console.log(err);
  return res.status(500).json({ message: GenericErrors.SERVER_ERROR});
}

