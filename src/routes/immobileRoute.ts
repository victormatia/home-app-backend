import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import ImmobileController from '../controllers/ImmobileController';
import ImmobileRepository from '../repository/ImmobileRepository';
import ImmobileService from '../services/ImmobileService';

const router = Router();

const prisma = new PrismaClient();

const repository = new ImmobileRepository(prisma);
const service = new ImmobileService(repository);
const controller = new ImmobileController(service);

router.get('/list', controller.getAll);
router.post('/create', controller.create);
router.get('/list/:id', controller.getImmobileById);
router.delete('/delete/:id', controller.deleteImmobileById);
router.patch('/update/:id', controller.updateImmobileById);

export default router;
