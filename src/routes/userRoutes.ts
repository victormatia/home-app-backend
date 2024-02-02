import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { Router } from 'express';
import { managementClient } from '../auth/Auth';
import UserController from '../controllers/UserController';
import UserRepository from '../repository/UserRepository';
import UserService from '../services/UserService';

config();

const route = Router();

export const prisma = new PrismaClient();


const repository = new UserRepository(prisma);
const service = new UserService(repository, managementClient);
const controller = new UserController(service);


route.post('/sign-up', controller.create);
route.post('/sign-in', controller.login);
route.get('/list', controller.getAll);
route.get('/list/:id', controller.getById);
route.put('/update/:id', controller.update);
route.delete('/delete/:id', controller.delete);
route.delete('/purge/:id', controller.purge);
route.put('/activate/:id', controller.activate);
// route.get('/teste', authMiddleware, (_, res) => {
//   return res.json({message: 'Rota protegida'});
// });

export default route;