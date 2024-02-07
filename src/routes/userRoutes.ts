import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { Router } from 'express';
import { authMiddleware, checkRequiredPermissions, managementClient } from '../auth/Auth';
import { PermissionEnum } from '../auth/PermissionEnum';
import UserController from '../controllers/UserController';
import { userCreationMiddleware } from '../middlewares/userCreationMiddleware';
import UserRepository from '../repository/UserRepository';
import UserService from '../services/UserService';

config();

const route = Router();

export const prisma = new PrismaClient();


const repository = new UserRepository(prisma);
const service = new UserService(repository, managementClient);
const controller = new UserController(service);

route.post('/sign-up', userCreationMiddleware, controller.create);
route.post('/sign-in', controller.login);
route.get('/list', authMiddleware, checkRequiredPermissions([PermissionEnum.ADMIN]), controller.getAll);
route.get(
  '/list/:id', 
  authMiddleware, 
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.USER]), 
  controller.getById,
);
route.put(
  '/update/:id',
  authMiddleware,
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.USER]), 
  controller.update,
);
route.delete(
  '/delete/:id',
  authMiddleware,
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.delete,
);
route.delete(
  '/purge/:id',
  authMiddleware,
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.USER])
  ,controller.purge,
);
route.put(
  '/activate/:id',
  authMiddleware,
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.activate,
);
// route.get('/teste', authMiddleware, (_, res) => {
//   return res.json({message: 'Rota protegida'});
// });

export default route;