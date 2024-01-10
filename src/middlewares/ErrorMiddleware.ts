import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { GenericErrors } from '../util/messages';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ApiError) {
    return res.status(400).json({message: err.message});
  } 
  return res.status(500).json({ message: GenericErrors.SERVER_ERROR});
}

