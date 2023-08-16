import express, { Request, Response } from 'express'

const server = express();

server.get('/', async (_req: Request, res: Response) => {
  res.status(200).send('Ok')
});

server.listen(3001, () => console.log('server is running on port 3001'));