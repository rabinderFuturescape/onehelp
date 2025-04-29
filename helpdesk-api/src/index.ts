import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { initializeDatabase } from './infrastructure/config/database';
import { config } from './infrastructure/config/env';
import routes from './presentation/routes';
import { errorHandler } from './presentation/middlewares/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/v1', routes);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Try to initialize the database, but continue even if it fails
    try {
      await initializeDatabase();
      console.log('Database initialized successfully');
    } catch (dbError) {
      console.error('Database initialization failed:', dbError);
      console.log('Continuing without database connection for testing purposes');
    }

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
