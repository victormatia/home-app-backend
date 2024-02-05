import { ManagementClient } from 'auth0';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck } from 'express-oauth2-jwt-bearer';
config();

export const authMiddleware = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});

export const managementClient = new ManagementClient({
  domain: 'dev-xxqg1s11rae0x4rz.us.auth0.com',
  clientId: '9c5ruxxi9CEcIoaVk5Js02oJ6Q7rqHPP',
  clientSecret: 'asRMXlKS_xnwU23F7HjNV0SdW42pPcVdCk6rKKMkS3r_sAJIn9eANngdTRUyEcg4',
});


export const checkRequiredPermissions = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions as string[];

      console.log(payload);
      console.log(permissions);
      return true;

    });

    permissionCheck(req, res, next);
  };
};