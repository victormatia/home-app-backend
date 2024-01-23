import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { Auth } from '../auth/Auth';
import { PermissionEnum } from '../auth/PermissionEnum';
import UserController from '../controllers/UserController';
import UserRepository from '../repository/UserRepository';
import UserService from '../services/UserService';

const route = Router();

export const prisma = new PrismaClient();


const repository = new UserRepository(prisma);
const service = new UserService(repository);
const controller = new UserController(service);

route.post('/sign-up', controller.create);
route.post('/sign-in', controller.login);
route.get('/list', Auth.authenticationMiddleware, Auth.permissionMiddleware([PermissionEnum.ADMIN]), controller.getAll);
route.get('/list/:id',
  Auth.authenticationMiddleware,
  Auth.permissionMiddleware([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.getById);
route.put('/update/:id',
  Auth.authenticationMiddleware,
  Auth.permissionMiddleware([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.update);
route.delete('/delete/:id',
  Auth.authenticationMiddleware,
  Auth.permissionMiddleware([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.delete);
route.delete('/purge/:id',
  Auth.authenticationMiddleware,
  Auth.permissionMiddleware([PermissionEnum.ADMIN]),
  controller.purge);
route.put('/activate/:id',
  Auth.authenticationMiddleware,
  Auth.permissionMiddleware([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.activate);

export default route;