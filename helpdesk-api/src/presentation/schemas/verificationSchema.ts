/**
 * Schema definitions for verification API endpoints
 */
import { errorResponseSchema, timestampsSchema } from './baseSchema';

// Verification Status Enum
export const verificationStatusEnum = {
  type: 'string',
  enum: ['pending', 'approved', 'rejected'],
  description: 'Verification status',
};

// Verification Object Schema (used in responses)
export const verificationSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Verification ID',
    },
    ticketId: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the ticket being verified',
    },
    requestedById: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the user who requested verification',
    },
    verifierId: {
      type: ['string', 'null'],
      format: 'uuid',
      description: 'ID of the user who verified the ticket (null if pending)',
    },
    status: verificationStatusEnum,
    notes: {
      type: 'string',
      description: 'Notes about the verification',
    },
    evidence: {
      type: 'array',
      items: {
        type: 'string',
        description: 'URL to evidence file',
      },
      description: 'Evidence files for verification',
    },
    ...timestampsSchema,
  },
  required: ['id', 'ticketId', 'requestedById', 'status', 'createdAt', 'updatedAt'],
};

// Create Verification Request Schema
export const createVerificationRequestSchema = {
  type: 'object',
  properties: {
    ticketId: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the ticket being verified',
    },
    notes: {
      type: 'string',
      description: 'Notes about the verification',
    },
    evidence: {
      type: 'array',
      items: {
        type: 'string',
        description: 'URL to evidence file',
      },
      description: 'Evidence files for verification',
    },
  },
  required: ['ticketId'],
};

// Create Verification Response Schema
export const createVerificationResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful verification creation',
    },
    data: verificationSchema,
  },
  required: ['success', 'data'],
};

// Update Verification Request Schema
export const updateVerificationRequestSchema = {
  type: 'object',
  properties: {
    status: verificationStatusEnum,
    verifierId: {
      type: 'string',
      format: 'uuid',
      description: 'ID of the user who verified the ticket',
    },
    notes: {
      type: 'string',
      description: 'Notes about the verification',
    },
    evidence: {
      type: 'array',
      items: {
        type: 'string',
        description: 'URL to evidence file',
      },
      description: 'Evidence files for verification',
    },
  },
};

// Update Verification Response Schema
export const updateVerificationResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful verification update',
    },
    data: verificationSchema,
  },
  required: ['success', 'data'],
};

// Get Verification Response Schema
export const getVerificationResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful verification retrieval',
    },
    data: verificationSchema,
  },
  required: ['success', 'data'],
};

// Get Verifications Response Schema
export const getVerificationsResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful verifications retrieval',
    },
    data: {
      type: 'array',
      items: verificationSchema,
      description: 'List of verifications',
    },
  },
  required: ['success', 'data'],
};

// Verification Error Responses
export const verificationErrorResponses = {
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
    description: 'Not Found - Verification or ticket not found',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
