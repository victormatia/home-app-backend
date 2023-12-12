import sinon from 'sinon';
import { prisma } from '../../routes/user.routes';

const prismaMock = { 
  user: { 
    create: sinon.stub(prisma.user, 'create'), 
    findMany: sinon.stub(prisma.user, 'findMany'), 
  }, 
};


export default prismaMock;