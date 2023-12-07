import sinon from 'sinon';
import { prisma } from '../../routes/user.routes';

const prismaMock = {user: {create: sinon.stub(prisma.user, 'create')}};


export default prismaMock;