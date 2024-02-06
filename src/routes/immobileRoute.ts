import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { authMiddleware, checkRequiredPermissions } from '../auth/Auth';
import { PermissionEnum } from '../auth/PermissionEnum';
import ImmobileController from '../controllers/ImmobileController';
import ImmobileRepository from '../repository/ImmobileRepository';
import ImmobileService from '../services/ImmobileService';

const router = Router();

const prisma = new PrismaClient();

const repository = new ImmobileRepository(prisma);
const service = new ImmobileService(repository);
const controller = new ImmobileController(service);

router.get('/list', controller.getAll);
router.post('/create', authMiddleware, controller.create);
router.get('/list/:id', controller.getImmobileById);
router.delete(
  '/delete/:id', 
  authMiddleware,
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.IMMOBILE]),
  controller.deleteImmobileById,
);
router.patch(
  '/update/:id', 
  authMiddleware,
  checkRequiredPermissions([PermissionEnum.ADMIN, PermissionEnum.IMMOBILE]),
  controller.updateImmobileById,
);

export default router;
