import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
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
route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);
// route.delete('/:id/purge', controller.purge);

export default route;