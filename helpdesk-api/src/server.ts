import { createApp } from './app';
import { AppDataSource } from './infrastructure/config/database';
import { config } from './infrastructure/config/env';

const startServer = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connection established');

    // Create and start Express app
    const app = createApp();
    const port = config.port || 3000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
