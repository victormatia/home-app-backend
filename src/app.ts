import express, { NextFunction, Request, Response } from 'express';

import { errorMiddleware } from './middlewares/ErrorMiddleware';
import immobileRoutes from './routes/immobile.routes';
import userRoutes from './routes/user.routes';

class App {
  // melhoria: aplicar desacoplamento de depedência
  private _server = express();

  constructor() {
    this.config();

    // test route
    this._server.get('/', async (_req: Request, res: Response) => {
      res.status(200).send('Ok');
    });

    this._server.use('/user', userRoutes);
    this._server.use('/immobile', immobileRoutes);
  }

  private config():void {
    const accessControl = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this._server.use(express.json());
    this._server.use(accessControl);
    this._server.use(errorMiddleware);
  }

  public init(port: string | number):void {
    this._server.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));
  }
}

export default App;

