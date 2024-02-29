import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { ApiError } from '../error/ApiError';
import { AuthorizationErrors, GenericErrors } from '../util/messages';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ApiError) {
    console.error(err);
    return res.status(err.status).json({message: err.message});
  }
  if(err instanceof UnauthorizedError) {
    console.error(err);
    return res.status(err.statusCode).json({message: AuthorizationErrors.UNAUTHORIZED_ERROR});
  }
  console.error(err);
  return res.status(500).json({ message: GenericErrors.SERVER_ERROR});
}

