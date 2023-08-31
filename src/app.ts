import express, { Request, Response, NextFunction } from 'express';

import userRoutes from './routes/user.routes';

class App {
  // melhoria: aplicar desacoplamento de depedência
  private _server = express();

  constructor() {
    this.config();

    // routes
    this._server.get('/', async (_req: Request, res: Response) => {
      res.status(200).send('Ok');
    });

    this._server.use('/user', userRoutes);

  }

  private config():void {
    const accessControl = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', 'localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this._server.use(express.json());
    this._server.use(accessControl);
  }

  public init(port: string | number):void {
    this._server.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));
  }
}

export default App;
