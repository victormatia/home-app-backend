import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import ImmobileController from '../controllers/ImmobileController';
import { TokenMiddleware } from '../middlewares/TokenMiddleware';
import ImmobileService from '../services/ImmobileService';

const router = Router();

const prisma = new PrismaClient();
const service = new ImmobileService(prisma);
const controller = new ImmobileController(service);

router.get('/list', controller.getAll);
router.post('/create', TokenMiddleware.validate, controller.create);
router.get('/list/:id', TokenMiddleware.validate, controller.getImmobileById);
router.delete('/delete/:id', TokenMiddleware.validate, controller.deleteImmobileById);
router.patch('/update/:id', TokenMiddleware.validate, controller.updateImmobileById);

export default router;
