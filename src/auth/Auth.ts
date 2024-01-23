import { NextFunction, Request, Response } from 'express';
import { JWTPayload, auth, claimCheck } from 'express-oauth2-jwt-bearer';
import { PermissionEnum } from './PermissionEnum';

export class Auth {
  static authenticationMiddleware() {
    return auth({
      audience: process.env.AUDIENCE,
      issuerBaseURL: process.env.ISSUER,
      tokenSigningAlg: process.env.TOKEN_ALGORITHM || 'RS256',
    });
  }
  
  static permissionMiddleware(requiredPermisons: PermissionEnum[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const permissionsCheck = claimCheck((claims) => {
        
        const permissions = claims.permissions as PermissionEnum[];
        const hasPermission = permissions.some((permission) => {
          if(requiredPermisons.includes(permission)) {
            return this.checkPermissionRule(permission, req, claims); 
          }
          return false;
        });
        
        return hasPermission;
      });
      permissionsCheck(req, res, next);
    };
  }

  static checkPermissionRule(permission: PermissionEnum, req: Request, claims: JWTPayload) {
    if(permission === PermissionEnum.ADMIN) {
      return true;
    } else if(permission === PermissionEnum.USER) {
      return req?.params.id === claims?.sub;
    }
    return false;
  }
}
