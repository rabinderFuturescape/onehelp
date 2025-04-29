import { DataSource } from 'typeorm';
import { config } from './env';
import { UserEntity } from '../persistence/entities/UserEntity';
import { TicketEntity } from '../persistence/entities/TicketEntity';
import { CommentEntity } from '../persistence/entities/CommentEntity';
import { EscalationRuleEntity } from '../persistence/entities/EscalationRuleEntity';
import { EscalationTierEntity } from '../persistence/entities/EscalationTierEntity';
import { VerificationEntity } from '../persistence/entities/VerificationEntity';
import { HelpTopicEntity } from '../persistence/entities/HelpTopicEntity';
import { CannedResponseEntity } from '../persistence/entities/CannedResponseEntity';
import { RoleEntity } from '../persistence/entities/RoleEntity';

// Use SQLite for local development/testing
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: config.isDevelopment,
  entities: [
    UserEntity,
    TicketEntity,
    CommentEntity,
    EscalationRuleEntity,
    EscalationTierEntity,
    VerificationEntity,
    HelpTopicEntity,
    CannedResponseEntity,
    RoleEntity,
  ],
  migrations: ['src/infrastructure/persistence/migrations/*.ts'],
  subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');
  } catch (error) {
    console.error('Error initializing database connection:', error);
    throw error;
  }
};
