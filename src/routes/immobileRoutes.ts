import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import ImmobileController from '../controllers/ImmobileController';
import { FavoriteRepository } from '../repository/FavoriteRepository';
import ImmobileRepository from '../repository/ImmobileRepository';
import ImmobileService from '../services/ImmobileService';

const router = Router();

const prisma = new PrismaClient();

const repository = new ImmobileRepository(prisma);
const favoriteRepository = new FavoriteRepository(prisma);
const service = new ImmobileService(repository, favoriteRepository);
const controller = new ImmobileController(service);

router.get('/list', controller.getAll);
router.post('/create', controller.create);
router.get('/list/:id', controller.getImmobileById);
router.delete('/delete/:id', controller.deleteImmobileById);
router.patch('/update/:id',controller.updateImmobileById);
router.post('/favorite', controller.favoriteImmobile);
router.delete('/unfavorite', controller.unfavoriteImmobile);


export default router;
