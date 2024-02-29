import { ManagementClient } from 'auth0';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck } from 'express-oauth2-jwt-bearer';
import { AccessForbidden } from '../error/AccessForbidden';
import { AuthorizationErrors } from '../util/messages';
import { PermissionContainer } from './PermissionContainer';
import { PermissionEnum } from './PermissionEnum';
config();

export const authMiddleware = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});

export const managementClient = new ManagementClient({
  domain: process.env.AUTH_DOMAIN as string,
  clientId: process.env.AUTH_CLIENT_ID as string,
  clientSecret: process.env.AUTH_SECRET as string,
});


export const checkRequiredPermissions = (permissions: PermissionEnum[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck((payload) => {
      const claimPermissions = payload.permissions as PermissionEnum[];
      const permission = claimPermissions.find((permissionValue) => permissions.includes(permissionValue));
      if(permission) {
        const tokenUserId = payload.userId as string;
        const id = req.params.id;
        const permissionContainer = new PermissionContainer(id, tokenUserId);
        return permissionContainer.useValidator(permission);
      }
      
      return false;
    });
    try{
      permissionCheck(req, res, next);
    } catch(err) {
      throw new AccessForbidden(AuthorizationErrors.ACCESS_FORBIDEN);
    }
  };
};