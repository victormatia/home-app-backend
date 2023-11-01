import { RequestHandler } from 'express';
import Jwt from '../auth/Jwt';

export class TokenMiddleware {
  static validate: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) return res.status(400).json({ message: 'Token not found' });

    try {
      Jwt.verifyToken(authorization);
      next();
    } catch(e) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}
