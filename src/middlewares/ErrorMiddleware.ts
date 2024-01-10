import { Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { GenericErrors } from '../util/messages';

export function errorMiddleware(err: Error, req: Request, res: Response) {
  if(err instanceof ApiError) {
    return res.status(err.status).json({message: err.message});
  } 
  return res.status(500).json({ message: GenericErrors.SERVER_ERROR});
}

