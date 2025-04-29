import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './presentation/middlewares/errorHandler';
import routes from './presentation/routes';
import { config } from './infrastructure/config/env';

export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', routes);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Error handler
  app.use(errorHandler);

  return app;
};

if (require.main === module) {
  const app = createApp();
  const port = config.port || 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
