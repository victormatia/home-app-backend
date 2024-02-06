import { ManagementClient } from 'auth0';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck } from 'express-oauth2-jwt-bearer';
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
      const calimPermissions = payload.permissions as PermissionEnum[];
      const permission = calimPermissions[0];
      if(permissions.includes(permission)) {
        const tokenUserId = payload.userId as string;
        const userId = req.params.id;
        const permissionContainer = new PermissionContainer(userId, tokenUserId);
        return permissionContainer.useValidator(permission);
      }
      
      return false;
    });

    permissionCheck(req, res, next);
  };
};