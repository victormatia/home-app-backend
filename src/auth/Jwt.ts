import { sign, verify } from 'jsonwebtoken';
import { InvalidTokenError } from '../error/InvalidTokenError';

export default class Jwt {
  static secret: string = process.env.SECRET || 'temporary_secret';
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static createToken(payload: any): string {
    const token = sign(payload, Jwt.secret, { algorithm: 'HS256', expiresIn: '1d'});

    return token;
  }

  static verifyToken(token: string) {
    try {
      return verify(token, Jwt.secret);
    } catch(e) {
      throw new InvalidTokenError();
    }
  }
}

