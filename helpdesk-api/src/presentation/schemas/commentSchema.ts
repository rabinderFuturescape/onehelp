/**
 * Schema definitions for comment API endpoints
 */
import { errorResponseSchema, timestampsSchema } from './baseSchema';

// Comment Object Schema (used in responses)
export const commentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Comment ID',
    },
    content: {
      type: 'string',
      description: 'Comment content',
    },
    ticketId: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the ticket this comment belongs to',
    },
    userId: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the user who created the comment',
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
          description: 'User name',
        },
      },
      required: ['id', 'name'],
      description: 'User who created the comment',
    },
    ...timestampsSchema,
  },
  required: ['id', 'content', 'ticketId', 'userId', 'createdAt', 'updatedAt'],
};

// Create Comment Request Schema
export const createCommentRequestSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      description: 'Comment content',
      minLength: 1,
    },
    ticketId: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the ticket this comment belongs to',
    },
  },
  required: ['content', 'ticketId'],
};

// Create Comment Response Schema
export const createCommentResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful comment creation',
    },
    data: commentSchema,
  },
  required: ['success', 'data'],
};

// Update Comment Request Schema
export const updateCommentRequestSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      description: 'Comment content',
      minLength: 1,
    },
  },
  required: ['content'],
};

// Update Comment Response Schema
export const updateCommentResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful comment update',
    },
    data: commentSchema,
  },
  required: ['success', 'data'],
};

// Get Comments by Ticket ID Response Schema
export const getCommentsByTicketIdResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful comments retrieval',
    },
    data: {
      type: 'array',
      items: commentSchema,
      description: 'List of comments for the ticket',
    },
  },
  required: ['success', 'data'],
};

// Comment Error Responses
export const commentErrorResponses = {
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
    description: 'Not Found - Comment or ticket not found',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
