import { sign } from 'jsonwebtoken';

export default class Jwt {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static createToken(payload: any) {
    const secret = process.env.SECRET || 'temporary_secret';
    const token = sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d'});

    return token;
  }

  static verifyToken() {}
}

