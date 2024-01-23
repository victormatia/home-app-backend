import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { Auth } from '../auth/Auth';
import { PermissionEnum } from '../auth/PermissionEnum';
import ImmobileController from '../controllers/ImmobileController';
import { TokenMiddleware } from '../middlewares/TokenMiddleware';
import ImmobileRepository from '../repository/ImmobileRepository';
import ImmobileService from '../services/ImmobileService';

const router = Router();

const prisma = new PrismaClient();

const repository = new ImmobileRepository(prisma);
const service = new ImmobileService(repository);
const controller = new ImmobileController(service);

router.get('/list', controller.getAll);
router.post('/create', 
  Auth.authenticationMiddleware,
  Auth.permissionMiddleware([PermissionEnum.ADMIN, PermissionEnum.USER]),
  controller.create);
router.get('/list/:id', controller.getImmobileById);
router.delete('/delete/:id', TokenMiddleware.validate, controller.deleteImmobileById);
router.patch('/update/:id', TokenMiddleware.validate, controller.updateImmobileById);

export default router;
