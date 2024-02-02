import { ManagementClient } from 'auth0';
import { config } from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
config();

export const authMiddleware = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});
//   static permissionMiddleware(requiredPermisons: PermissionEnum[]) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       const permissionsCheck = claimCheck((claims) => {
        
//         const permissions = claims.permissions as PermissionEnum[];
//         const hasPermission = permissions.some((permission) => {
//           if(requiredPermisons.includes(permission)) {
//             return this.checkPermissionRule(permission, req, claims); 
//           }
//           return false;
//         });
        
//         return hasPermission;
//       });
//       permissionsCheck(req, res, next);
//     };
//   }

//   static checkPermissionRule(permission: PermissionEnum, req: Request, claims: JWTPayload) {
//     if(permission === PermissionEnum.ADMIN) {
//       return true;
//     } else if(permission === PermissionEnum.USER) {
//       return req?.params.id === claims?.sub;
//     }
//     return false;
//   }
// }
export const managementClient = new ManagementClient({
  domain: 'dev-xxqg1s11rae0x4rz.us.auth0.com',
  clientId: '9c5ruxxi9CEcIoaVk5Js02oJ6Q7rqHPP',
  clientSecret: 'asRMXlKS_xnwU23F7HjNV0SdW42pPcVdCk6rKKMkS3r_sAJIn9eANngdTRUyEcg4',
});