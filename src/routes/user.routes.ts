import { PrismaClient } from '@prisma/client';
import { ManagementClient } from 'auth0';
import { config } from 'dotenv';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserRepository from '../repository/UserRepository';
import UserService from '../services/UserService';

config();
const route = Router();

export const prisma = new PrismaClient();
const managementClient = new ManagementClient({
  domain: process.env.AUTH_DOMAIN as string,
  clientSecret: process.env.AUTH_SECRET as string,
  clientId: process.env.AUTH_CLIENT_ID as string,
});

const repository = new UserRepository(prisma);
const service = new UserService(repository, managementClient);
const controller = new UserController(service);

route.post('/sign-up', controller.create);
route.post('/sign-in', controller.login);
route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);
route.delete('/:id/purge', controller.purge);
route.put('/:id/activate', controller.activate);
route.put('/:id/change-password',controller.cheangePassword );

export default route;