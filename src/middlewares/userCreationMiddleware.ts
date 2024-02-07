import { NextFunction, Request, Response } from 'express';
import { JWTPayload } from 'express-oauth2-jwt-bearer';
import { decode } from 'jsonwebtoken';
import { BadRequestError } from '../error/BadRequestError';
import { UserErrors } from '../util/messages';

export function userCreationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const userInfo = decode(token, { complete: true });
    const payload = userInfo?.payload as JWTPayload;
    const { userId } = payload as { userId: string };
    req.body = { ...req.body, id: userId };

  } catch (err) {
    throw new BadRequestError(UserErrors.TOKEN_MALFORMED);
  }
  return next();
}