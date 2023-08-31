import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import { PrismaClient } from '@prisma/client';

const route = Router();
const prisma = new PrismaClient();
const service = new UserService(prisma);
const controller = new UserController(service);

route.post('/sign-up', controller.create);


export default route;