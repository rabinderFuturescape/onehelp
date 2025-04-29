import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const config = {
  port: parseInt(getEnv('PORT', '3000'), 10),
  isDevelopment: getEnv('NODE_ENV', 'development') === 'development',
  jwtSecret: getEnv('JWT_SECRET', 'your-secret-key-for-development'),
  jwtExpiresIn: getEnv('JWT_EXPIRATION', '1d'),
  database: {
    host: getEnv('DATABASE_HOST', 'localhost'),
    port: parseInt(getEnv('DATABASE_PORT', '5432'), 10),
    username: getEnv('DATABASE_USERNAME', 'postgres'),
    password: getEnv('DATABASE_PASSWORD', 'postgres'),
    name: getEnv('DATABASE_NAME', 'helpdesk'),
  },
  upload: {
    path: getEnv('UPLOAD_PATH', 'uploads'),
    maxSize: parseInt(getEnv('UPLOAD_MAX_SIZE', '5242880'), 10), // 5MB
    allowedTypes: getEnv('UPLOAD_ALLOWED_TYPES', 'image/jpeg,image/png,application/pdf').split(','),
  },
  email: {
    host: getEnv('EMAIL_HOST', 'smtp.example.com'),
    port: parseInt(getEnv('EMAIL_PORT', '587'), 10),
    secure: getEnv('EMAIL_SECURE', 'false') === 'true',
    auth: {
      user: getEnv('EMAIL_USER', ''),
      pass: getEnv('EMAIL_PASS', ''),
    },
    from: getEnv('EMAIL_FROM', 'helpdesk@example.com'),
  },
};
