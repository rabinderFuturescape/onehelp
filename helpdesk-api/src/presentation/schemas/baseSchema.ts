/**
 * Base schema definitions for API responses
 */

export const baseResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      description: 'Indicates if the request was successful',
    },
    message: {
      type: 'string',
      description: 'A message describing the result of the operation',
    },
  },
};

export const paginationSchema = {
  type: 'object',
  properties: {
    page: {
      type: 'integer',
      description: 'Current page number',
      minimum: 1,
    },
    limit: {
      type: 'integer',
      description: 'Number of items per page',
      minimum: 1,
    },
    total: {
      type: 'integer',
      description: 'Total number of items',
      minimum: 0,
    },
    totalPages: {
      type: 'integer',
      description: 'Total number of pages',
      minimum: 0,
    },
  },
  required: ['page', 'limit', 'total', 'totalPages'],
};

export const errorResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [false],
      description: 'Indicates that the request failed',
    },
    error: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Error message',
        },
        code: {
          type: 'string',
          description: 'Error code',
        },
        status: {
          type: 'integer',
          description: 'HTTP status code',
        },
      },
      required: ['message', 'status'],
    },
  },
  required: ['success', 'error'],
};

export const timestampsSchema = {
  createdAt: {
    type: 'string',
    format: 'date-time',
    description: 'Creation timestamp',
  },
  updatedAt: {
    type: 'string',
    format: 'date-time',
    description: 'Last update timestamp',
  },
};
