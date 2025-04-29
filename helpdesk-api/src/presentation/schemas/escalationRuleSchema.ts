/**
 * Schema definitions for escalation rule API endpoints
 */
import { errorResponseSchema, timestampsSchema } from './baseSchema';

// Escalation Tier Object Schema
export const escalationTierSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Escalation Tier ID',
    },
    level: {
      type: 'integer',
      description: 'Tier level (1, 2, 3, etc.)',
      minimum: 1,
    },
    timeThreshold: {
      type: 'integer',
      description: 'Time threshold in minutes before escalation to this tier',
      minimum: 1,
    },
    assigneeIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
        description: 'User ID of an assignee',
      },
      description: 'List of user IDs to assign at this tier',
    },
    notifyIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
        description: 'User ID to notify',
      },
      description: 'List of user IDs to notify at this tier',
    },
  },
  required: ['level', 'timeThreshold'],
};

// Escalation Rule Object Schema (used in responses)
export const escalationRuleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Escalation Rule ID',
    },
    name: {
      type: 'string',
      description: 'Escalation Rule name',
    },
    description: {
      type: 'string',
      description: 'Escalation Rule description',
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the escalation rule is active',
    },
    conditions: {
      type: 'object',
      properties: {
        priority: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'urgent'],
            description: 'Ticket priority',
          },
          description: 'List of priorities this rule applies to',
        },
        helpTopicIds: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
            description: 'Help Topic ID',
          },
          description: 'List of help topic IDs this rule applies to',
        },
      },
      description: 'Conditions for when this rule applies',
    },
    tiers: {
      type: 'array',
      items: escalationTierSchema,
      description: 'List of escalation tiers',
    },
    ...timestampsSchema,
  },
  required: ['id', 'name', 'isActive', 'tiers', 'createdAt', 'updatedAt'],
};

// Create Escalation Rule Request Schema
export const createEscalationRuleRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Escalation Rule name',
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description: 'Escalation Rule description',
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the escalation rule is active',
      default: true,
    },
    conditions: {
      type: 'object',
      properties: {
        priority: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'urgent'],
            description: 'Ticket priority',
          },
          description: 'List of priorities this rule applies to',
        },
        helpTopicIds: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
            description: 'Help Topic ID',
          },
          description: 'List of help topic IDs this rule applies to',
        },
      },
      description: 'Conditions for when this rule applies',
    },
    tiers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          level: {
            type: 'integer',
            description: 'Tier level (1, 2, 3, etc.)',
            minimum: 1,
          },
          timeThreshold: {
            type: 'integer',
            description: 'Time threshold in minutes before escalation to this tier',
            minimum: 1,
          },
          assigneeIds: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
              description: 'User ID of an assignee',
            },
            description: 'List of user IDs to assign at this tier',
          },
          notifyIds: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
              description: 'User ID to notify',
            },
            description: 'List of user IDs to notify at this tier',
          },
        },
        required: ['level', 'timeThreshold'],
      },
      description: 'List of escalation tiers',
    },
  },
  required: ['name', 'tiers'],
};

// Create Escalation Rule Response Schema
export const createEscalationRuleResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful escalation rule creation',
    },
    data: escalationRuleSchema,
  },
  required: ['success', 'data'],
};

// Update Escalation Rule Request Schema
export const updateEscalationRuleRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Escalation Rule name',
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description: 'Escalation Rule description',
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the escalation rule is active',
    },
    conditions: {
      type: 'object',
      properties: {
        priority: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'urgent'],
            description: 'Ticket priority',
          },
          description: 'List of priorities this rule applies to',
        },
        helpTopicIds: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
            description: 'Help Topic ID',
          },
          description: 'List of help topic IDs this rule applies to',
        },
      },
      description: 'Conditions for when this rule applies',
    },
    tiers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Escalation Tier ID (required for updating existing tiers)',
          },
          level: {
            type: 'integer',
            description: 'Tier level (1, 2, 3, etc.)',
            minimum: 1,
          },
          timeThreshold: {
            type: 'integer',
            description: 'Time threshold in minutes before escalation to this tier',
            minimum: 1,
          },
          assigneeIds: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
              description: 'User ID of an assignee',
            },
            description: 'List of user IDs to assign at this tier',
          },
          notifyIds: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
              description: 'User ID to notify',
            },
            description: 'List of user IDs to notify at this tier',
          },
        },
        required: ['level', 'timeThreshold'],
      },
      description: 'List of escalation tiers',
    },
  },
};

// Update Escalation Rule Response Schema
export const updateEscalationRuleResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful escalation rule update',
    },
    data: escalationRuleSchema,
  },
  required: ['success', 'data'],
};

// Get Escalation Rule Response Schema
export const getEscalationRuleResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful escalation rule retrieval',
    },
    data: escalationRuleSchema,
  },
  required: ['success', 'data'],
};

// Get Escalation Rules Response Schema
export const getEscalationRulesResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful escalation rules retrieval',
    },
    data: {
      type: 'array',
      items: escalationRuleSchema,
      description: 'List of escalation rules',
    },
  },
  required: ['success', 'data'],
};

// Escalation Rule Error Responses
export const escalationRuleErrorResponses = {
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
    description: 'Not Found - Escalation rule not found',
    schema: errorResponseSchema,
  },
  '409': {
    description: 'Conflict - Escalation rule name already exists',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
