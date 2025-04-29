/**
 * Schema definitions for help topic API endpoints
 */
import { errorResponseSchema, timestampsSchema } from './baseSchema';

// Help Topic Object Schema (used in responses)
export const helpTopicSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Help Topic ID',
    },
    name: {
      type: 'string',
      description: 'Help Topic name',
    },
    description: {
      type: 'string',
      description: 'Help Topic description',
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the help topic is active',
    },
    parentId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the parent help topic (null if top-level)',
    },
    order: {
      type: 'integer',
      description: 'Display order of the help topic',
    },
    defaultAssigneeId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the default assignee for tickets with this help topic',
    },
    ...timestampsSchema,
  },
  required: ['id', 'name', 'description', 'isActive', 'order', 'createdAt', 'updatedAt'],
};

// Create Help Topic Request Schema
export const createHelpTopicRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Help Topic name',
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description: 'Help Topic description',
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the help topic is active',
      default: true,
    },
    parentId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the parent help topic (null if top-level)',
    },
    order: {
      type: 'integer',
      description: 'Display order of the help topic',
      minimum: 0,
    },
    defaultAssigneeId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the default assignee for tickets with this help topic',
    },
  },
  required: ['name', 'description'],
};

// Create Help Topic Response Schema
export const createHelpTopicResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful help topic creation',
    },
    data: helpTopicSchema,
  },
  required: ['success', 'data'],
};

// Update Help Topic Request Schema
export const updateHelpTopicRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Help Topic name',
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description: 'Help Topic description',
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the help topic is active',
    },
    parentId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the parent help topic (null if top-level)',
    },
    order: {
      type: 'integer',
      description: 'Display order of the help topic',
      minimum: 0,
    },
    defaultAssigneeId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the default assignee for tickets with this help topic',
    },
  },
};

// Update Help Topic Response Schema
export const updateHelpTopicResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful help topic update',
    },
    data: helpTopicSchema,
  },
  required: ['success', 'data'],
};

// Get Help Topic Response Schema
export const getHelpTopicResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful help topic retrieval',
    },
    data: helpTopicSchema,
  },
  required: ['success', 'data'],
};

// Get Help Topics Response Schema
export const getHelpTopicsResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful help topics retrieval',
    },
    data: {
      type: 'array',
      items: helpTopicSchema,
      description: 'List of help topics',
    },
  },
  required: ['success', 'data'],
};

// Help Topic Error Responses
export const helpTopicErrorResponses = {
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
    description: 'Not Found - Help topic not found',
    schema: errorResponseSchema,
  },
  '409': {
    description: 'Conflict - Help topic name already exists',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
