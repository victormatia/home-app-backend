import { NextFunction, Request, Response } from 'express';
import Jwt from '../auth/Jwt';
import { AuthorizationErrors } from '../util/messages';

export class TokenMiddleware {
  static validate = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization) return res.status(400).json({ message: AuthorizationErrors.TOKEN_NOT_FOUND });

    try {
      Jwt.verifyToken(authorization);
      return next();
    } catch(e) {
      return res.status(401).json({ message: AuthorizationErrors.INVALID_TOKEN});
    }
  };
}
