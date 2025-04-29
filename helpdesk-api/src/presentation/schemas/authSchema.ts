/**
 * Schema definitions for authentication API endpoints
 */
import { errorResponseSchema } from './baseSchema';

// Login Request Schema
export const loginRequestSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      description: 'User email address',
    },
    password: {
      type: 'string',
      description: 'User password',
      minLength: 8,
    },
  },
  required: ['email', 'password'],
};

// Login Response Schema
export const loginResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful login',
    },
    data: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'JWT authentication token',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            role: {
              type: 'string',
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
            },
          },
          required: ['id', 'name', 'email', 'role', 'createdAt'],
        },
      },
      required: ['token', 'user'],
    },
  },
  required: ['success', 'data'],
};

// Register Request Schema
export const registerRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'User full name',
      minLength: 2,
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User email address',
    },
    password: {
      type: 'string',
      description: 'User password',
      minLength: 8,
    },
  },
  required: ['name', 'email', 'password'],
};

// Register Response Schema
export const registerResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful registration',
    },
    data: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'JWT authentication token',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            role: {
              type: 'string',
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
            },
          },
          required: ['id', 'name', 'email', 'role', 'createdAt'],
        },
      },
      required: ['token', 'user'],
    },
  },
  required: ['success', 'data'],
};

// Auth Error Responses
export const authErrorResponses = {
  '400': {
    description: 'Bad Request - Invalid input data',
    schema: errorResponseSchema,
  },
  '401': {
    description: 'Unauthorized - Invalid credentials',
    schema: errorResponseSchema,
  },
  '409': {
    description: 'Conflict - Email already exists',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
