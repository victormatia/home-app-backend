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
router.get('/id::id', controller.getImmobileById);
router.delete('/delete::id', TokenMiddleware.validate, controller.deleteImmobileById);
router.patch('/update::id', TokenMiddleware.validate, controller.updateImmobileById);
router.post('/favorite', controller.favoriteImmobile);
router.delete('/unfavorite', controller.unfavoriteImmobile);

export default router;
