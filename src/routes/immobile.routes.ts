import { Router } from 'express';
import ImmobileController from '../controllers/ImmobileController';
import ImmobileService from '../services/ImmobileService';
import { PrismaClient } from '@prisma/client';
import { TokenMiddleware } from '../middlewares/TokenMiddleware';

const router = Router();

const prisma = new PrismaClient();
const service = new ImmobileService(prisma);
const controller = new ImmobileController(service);

router.get('/list', controller.getAll);
router.post('/create', TokenMiddleware.validate, controller.create);
// router.post('/delete', TokenMiddleware.validate, controller.);
// router.post('/update', TokenMiddleware.validate, controller.);
router.get('/id::id', controller.getImmobileById);

export default router;
