import { Role } from '@prisma/client';
import { config } from 'dotenv';
config();

export function getRoleId(role: Role) {
  if(role === 'ADMIN'){
    return process.env.ADMIN_ROLE_ID;
  }
  return process.env.USER_ROLE_ID;
}