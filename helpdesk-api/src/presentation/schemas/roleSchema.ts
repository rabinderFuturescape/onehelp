/**
 * Schema definitions for role API endpoints
 */
import { errorResponseSchema, timestampsSchema } from './baseSchema';

// Permission Object Schema
export const permissionSchema = {
  type: 'object',
  properties: {
    resource: {
      type: 'string',
      description: 'Resource name (e.g., "tickets", "users")',
    },
    actions: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['create', 'read', 'update', 'delete', 'manage'],
        description: 'Action that can be performed on the resource',
      },
      description: 'List of allowed actions on the resource',
    },
  },
  required: ['resource', 'actions'],
};

// Role Object Schema (used in responses)
export const roleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Role ID',
    },
    name: {
      type: 'string',
      description: 'Role name',
    },
    description: {
      type: 'string',
      description: 'Role description',
    },
    isSystem: {
      type: 'boolean',
      description: 'Whether this is a system role that cannot be modified',
    },
    permissions: {
      type: 'array',
      items: permissionSchema,
      description: 'List of permissions for this role',
    },
    ...timestampsSchema,
  },
  required: ['id', 'name', 'isSystem', 'permissions', 'createdAt', 'updatedAt'],
};

// Create Role Request Schema
export const createRoleRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Role name',
      minLength: 2,
      maxLength: 50,
    },
    description: {
      type: 'string',
      description: 'Role description',
    },
    permissions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          resource: {
            type: 'string',
            description: 'Resource name (e.g., "tickets", "users")',
          },
          actions: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['create', 'read', 'update', 'delete', 'manage'],
              description: 'Action that can be performed on the resource',
            },
            description: 'List of allowed actions on the resource',
          },
        },
        required: ['resource', 'actions'],
      },
      description: 'List of permissions for this role',
    },
  },
  required: ['name', 'permissions'],
};

// Create Role Response Schema
export const createRoleResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful role creation',
    },
    data: roleSchema,
  },
  required: ['success', 'data'],
};

// Update Role Request Schema
export const updateRoleRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Role name',
      minLength: 2,
      maxLength: 50,
    },
    description: {
      type: 'string',
      description: 'Role description',
    },
    permissions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          resource: {
            type: 'string',
            description: 'Resource name (e.g., "tickets", "users")',
          },
          actions: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['create', 'read', 'update', 'delete', 'manage'],
              description: 'Action that can be performed on the resource',
            },
            description: 'List of allowed actions on the resource',
          },
        },
        required: ['resource', 'actions'],
      },
      description: 'List of permissions for this role',
    },
  },
};

// Update Role Response Schema
export const updateRoleResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful role update',
    },
    data: roleSchema,
  },
  required: ['success', 'data'],
};

// Get Role Response Schema
export const getRoleResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful role retrieval',
    },
    data: roleSchema,
  },
  required: ['success', 'data'],
};

// Get Roles Response Schema
export const getRolesResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      enum: [true],
      description: 'Indicates successful roles retrieval',
    },
    data: {
      type: 'array',
      items: roleSchema,
      description: 'List of roles',
    },
  },
  required: ['success', 'data'],
};

// Role Error Responses
export const roleErrorResponses = {
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
    description: 'Not Found - Role not found',
    schema: errorResponseSchema,
  },
  '409': {
    description: 'Conflict - Role name already exists',
    schema: errorResponseSchema,
  },
  '500': {
    description: 'Internal Server Error',
    schema: errorResponseSchema,
  },
};
