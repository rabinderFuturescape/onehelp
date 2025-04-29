/**
 * Schema definitions for canned response API endpoints
 */
import { errorResponseSchema, timestampsSchema } from './baseSchema';

// Canned Response Object Schema (used in responses)
export const cannedResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Canned Response ID',
    },
    title: {
      type: 'string',
      description: 'Canned Response title',
    },
    content: {
      type: 'string',
      description: 'Canned Response content',
    },
    category: {
      type: 'string',
      description: 'Category of the canned response',
    },
    isGlobal: {
      type: 'boolean',
      description: 'Whether the canned response is available to all users',
    },
    createdById: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the user who created the canned response',
    },
    ...timestampsSchema,
  },
  required: ['id', 'title', 'content', 'isGlobal', 'createdById', 'createdAt', 'updatedAt'],
};

// Create Canned Response Request Schema
export const createCannedResponseRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Canned Response title',
      minLength: 2,
      maxLength: 100,
    },
    content: {
      type: 'string',
      description: 'Canned Response content',
      minLength: 1,
    },
    category: {
      type: 'string',
      description: 'Category of the canned response',
    },
    isGlobal: {
      type: 'boolean',
      description: 'Whether the canned response is available to all users',
      default: false,
    },
  },
  required: ['title', 'content'],
};

// Create Canned Response Response Schema
export const createCannedResponseResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful canned response creation',
    },
    data: cannedResponseSchema,
  },
  required: ['success', 'data'],
};

// Update Canned Response Request Schema
export const updateCannedResponseRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Canned Response title',
      minLength: 2,
      maxLength: 100,
    },
    content: {
      type: 'string',
      description: 'Canned Response content',
      minLength: 1,
    },
    category: {
      type: 'string',
      description: 'Category of the canned response',
    },
    isGlobal: {
      type: 'boolean',
      description: 'Whether the canned response is available to all users',
    },
  },
};

// Update Canned Response Response Schema
export const updateCannedResponseResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful canned response update',
    },
    data: cannedResponseSchema,
  },
  required: ['success', 'data'],
};

// Get Canned Response Response Schema
export const getCannedResponseResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful canned response retrieval',
    },
    data: cannedResponseSchema,
  },
  required: ['success', 'data'],
};

// Get Canned Responses Response Schema
export const getCannedResponsesResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful canned responses retrieval',
    },
    data: {
      type: 'array',
      items: cannedResponseSchema,
      description: 'List of canned responses',
    },
  },
  required: ['success', 'data'],
};

// Canned Response Error Responses
export const cannedResponseErrorResponses = {
  '400': {
    description: 'Bad Request - Invalid input data',
    schema: errorResponseSchema,
  },
  '401': {
    description: 'Unauthorized - Authentication required',
    schema: errorResponseSchema,
  },
  '403': {
    description: 'Forbidden - Insufficient permissions',
    schema: errorResponseSchema,
  },
  '404': {
    description: 'Not Found - Canned response not found',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
