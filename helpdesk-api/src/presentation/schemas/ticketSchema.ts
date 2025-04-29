/**
 * Schema definitions for ticket API endpoints
 */
import { errorResponseSchema, paginationSchema, timestampsSchema } from './baseSchema';

// Ticket Status and Priority Enums
export const ticketStatusEnum = {
  type: 'string',
  enum: ['open', 'in_progress', 'pending', 'resolved', 'closed'],
  description: 'Ticket status',
};

export const ticketPriorityEnum = {
  type: 'string',
  enum: ['low', 'medium', 'high', 'urgent'],
  description: 'Ticket priority',
};

// Ticket Object Schema (used in responses)
export const ticketSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Ticket ID',
    },
    title: {
      type: 'string',
      description: 'Ticket title',
    },
    description: {
      type: 'string',
      description: 'Ticket description',
    },
    status: ticketStatusEnum,
    priority: ticketPriorityEnum,
    createdById: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the user who created the ticket',
    },
    assignedToId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the user assigned to the ticket (null if unassigned)',
    },
    attachments: {
      type: 'array',
      items: {
        type: 'string',
        description: 'URL to an attachment',
      },
      description: 'List of ticket attachments',
    },
    ...timestampsSchema,
  },
  required: ['id', 'title', 'description', 'status', 'priority', 'createdById', 'createdAt', 'updatedAt'],
};

// Create Ticket Request Schema
export const createTicketRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Ticket title',
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description: 'Ticket description',
      minLength: 10,
    },
    priority: ticketPriorityEnum,
  },
  required: ['title', 'description'],
};

// Create Ticket Response Schema
export const createTicketResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful ticket creation',
    },
    data: ticketSchema,
  },
  required: ['success', 'data'],
};

// Update Ticket Request Schema
export const updateTicketRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Ticket title',
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description: 'Ticket description',
      minLength: 10,
    },
    status: ticketStatusEnum,
    priority: ticketPriorityEnum,
    assignedToId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the user to assign the ticket to (null to unassign)',
    },
  },
};

// Update Ticket Response Schema
export const updateTicketResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful ticket update',
    },
    data: ticketSchema,
  },
  required: ['success', 'data'],
};

// Get Ticket Response Schema
export const getTicketResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful ticket retrieval',
    },
    data: ticketSchema,
  },
  required: ['success', 'data'],
};

// Get Tickets Response Schema
export const getTicketsResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful tickets retrieval',
    },
    data: {
      type: 'object',
      properties: {
        tickets: {
          type: 'array',
          items: ticketSchema,
          description: 'List of tickets',
        },
        ...paginationSchema.properties,
      },
      required: ['tickets', 'page', 'limit', 'total', 'totalPages'],
    },
  },
  required: ['success', 'data'],
};

// Ticket Error Responses
export const ticketErrorResponses = {
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
    description: 'Not Found - Ticket not found',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
