import express, { type Application } from 'express';
import cors from 'cors';
import notaRoutes from '../routes/nota.routes.js';
import { dbConnection } from '../database/config.js';

export class Server {
  private app: Application;
  private port;

  private apiPaths = {
    notas: '/api/notas'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(this.apiPaths.notas, notaRoutes);
  }

  public async listen() {
    await dbConnection();

    this.app.listen(this.port, () => {
      console.log('Servidor escuchando en el puerto ' + this.port);
    });
  }
}