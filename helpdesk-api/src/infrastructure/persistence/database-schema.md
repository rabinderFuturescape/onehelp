# Helpdesk Database Schema

This document describes the database schema for the Helpdesk application.

## Tables

### users

| Column       | Type         | Constraints       | Description                       |
|--------------|--------------|-------------------|-----------------------------------|
| id           | UUID         | PK                | Unique identifier                 |
| name         | VARCHAR(100) | NOT NULL          | User's full name                  |
| email        | VARCHAR(100) | NOT NULL, UNIQUE  | User's email address              |
| password     | VARCHAR(100) | NOT NULL          | Hashed password                   |
| role_id      | UUID         | FK                | Reference to roles table          |
| is_active    | BOOLEAN      | NOT NULL          | Whether the user is active        |
| created_at   | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at   | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### roles

| Column       | Type         | Constraints       | Description                       |
|--------------|--------------|-------------------|-----------------------------------|
| id           | UUID         | PK                | Unique identifier                 |
| name         | VARCHAR(50)  | NOT NULL, UNIQUE  | Role name                         |
| description  | TEXT         |                   | Role description                  |
| is_system    | BOOLEAN      | NOT NULL          | Whether this is a system role     |
| permissions  | JSONB        | NOT NULL          | JSON array of permissions         |
| created_at   | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at   | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### tickets

| Column         | Type         | Constraints       | Description                       |
|----------------|--------------|-------------------|-----------------------------------|
| id             | UUID         | PK                | Unique identifier                 |
| title          | VARCHAR(100) | NOT NULL          | Ticket title                      |
| description    | TEXT         | NOT NULL          | Ticket description                |
| status         | ENUM         | NOT NULL          | Ticket status                     |
| priority       | ENUM         | NOT NULL          | Ticket priority                   |
| created_by_id  | UUID         | FK, NOT NULL      | Reference to users table          |
| assigned_to_id | UUID         | FK                | Reference to users table          |
| attachments    | TEXT[]       |                   | Array of attachment URLs          |
| created_at     | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at     | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### comments

| Column       | Type         | Constraints       | Description                       |
|--------------|--------------|-------------------|-----------------------------------|
| id           | UUID         | PK                | Unique identifier                 |
| content      | TEXT         | NOT NULL          | Comment content                   |
| ticket_id    | UUID         | FK, NOT NULL      | Reference to tickets table        |
| user_id      | UUID         | FK, NOT NULL      | Reference to users table          |
| created_at   | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at   | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### help_topics

| Column             | Type         | Constraints       | Description                       |
|--------------------|--------------|-------------------|-----------------------------------|
| id                 | UUID         | PK                | Unique identifier                 |
| name               | VARCHAR(100) | NOT NULL, UNIQUE  | Help topic name                   |
| description        | TEXT         | NOT NULL          | Help topic description            |
| is_active          | BOOLEAN      | NOT NULL          | Whether the help topic is active  |
| parent_id          | UUID         | FK                | Reference to help_topics table    |
| order              | INTEGER      | NOT NULL          | Display order                     |
| default_assignee_id| UUID         | FK                | Reference to users table          |
| created_at         | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at         | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### canned_responses

| Column       | Type         | Constraints       | Description                       |
|--------------|--------------|-------------------|-----------------------------------|
| id           | UUID         | PK                | Unique identifier                 |
| title        | VARCHAR(100) | NOT NULL          | Canned response title             |
| content      | TEXT         | NOT NULL          | Canned response content           |
| category     | VARCHAR(50)  |                   | Category                          |
| is_global    | BOOLEAN      | NOT NULL          | Whether it's available to all     |
| created_by_id| UUID         | FK, NOT NULL      | Reference to users table          |
| created_at   | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at   | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### verifications

| Column         | Type         | Constraints       | Description                       |
|----------------|--------------|-------------------|-----------------------------------|
| id             | UUID         | PK                | Unique identifier                 |
| ticket_id      | UUID         | FK, NOT NULL      | Reference to tickets table        |
| requested_by_id| UUID         | FK, NOT NULL      | Reference to users table          |
| verifier_id    | UUID         | FK                | Reference to users table          |
| status         | ENUM         | NOT NULL          | Verification status               |
| notes          | TEXT         |                   | Notes about the verification      |
| evidence       | TEXT[]       |                   | Array of evidence file URLs       |
| created_at     | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at     | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### escalation_rules

| Column       | Type         | Constraints       | Description                       |
|--------------|--------------|-------------------|-----------------------------------|
| id           | UUID         | PK                | Unique identifier                 |
| name         | VARCHAR(100) | NOT NULL, UNIQUE  | Escalation rule name              |
| description  | TEXT         |                   | Escalation rule description       |
| is_active    | BOOLEAN      | NOT NULL          | Whether the rule is active        |
| conditions   | JSONB        |                   | JSON object with conditions       |
| created_at   | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at   | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### escalation_tiers

| Column         | Type         | Constraints       | Description                       |
|----------------|--------------|-------------------|-----------------------------------|
| id             | UUID         | PK                | Unique identifier                 |
| rule_id        | UUID         | FK, NOT NULL      | Reference to escalation_rules     |
| level          | INTEGER      | NOT NULL          | Tier level (1, 2, 3, etc.)        |
| time_threshold | INTEGER      | NOT NULL          | Minutes before escalation         |
| created_at     | TIMESTAMP    | NOT NULL          | Creation timestamp                |
| updated_at     | TIMESTAMP    | NOT NULL          | Last update timestamp             |

### escalation_tier_assignees

| Column         | Type         | Constraints       | Description                       |
|----------------|--------------|-------------------|-----------------------------------|
| tier_id        | UUID         | FK, NOT NULL      | Reference to escalation_tiers     |
| user_id        | UUID         | FK, NOT NULL      | Reference to users                |
| PRIMARY KEY    | (tier_id, user_id) |             | Composite primary key             |

### escalation_tier_notifications

| Column         | Type         | Constraints       | Description                       |
|----------------|--------------|-------------------|-----------------------------------|
| tier_id        | UUID         | FK, NOT NULL      | Reference to escalation_tiers     |
| user_id        | UUID         | FK, NOT NULL      | Reference to users                |
| PRIMARY KEY    | (tier_id, user_id) |             | Composite primary key             |

## Relationships

- **users** to **roles**: Many-to-one (each user has one role)
- **tickets** to **users** (created_by): Many-to-one (each ticket is created by one user)
- **tickets** to **users** (assigned_to): Many-to-one (each ticket can be assigned to one user)
- **comments** to **tickets**: Many-to-one (each comment belongs to one ticket)
- **comments** to **users**: Many-to-one (each comment is created by one user)
- **help_topics** to **help_topics**: Self-referential (parent-child relationship)
- **help_topics** to **users**: Many-to-one (each help topic can have a default assignee)
- **canned_responses** to **users**: Many-to-one (each canned response is created by one user)
- **verifications** to **tickets**: Many-to-one (each verification is for one ticket)
- **verifications** to **users** (requested_by): Many-to-one (each verification is requested by one user)
- **verifications** to **users** (verifier): Many-to-one (each verification can be verified by one user)
- **escalation_tiers** to **escalation_rules**: Many-to-one (each tier belongs to one rule)
- **escalation_tier_assignees** to **escalation_tiers**: Many-to-one (each assignee record belongs to one tier)
- **escalation_tier_assignees** to **users**: Many-to-one (each assignee record references one user)
- **escalation_tier_notifications** to **escalation_tiers**: Many-to-one (each notification record belongs to one tier)
- **escalation_tier_notifications** to **users**: Many-to-one (each notification record references one user)

## Indexes

- **users**: email (UNIQUE)
- **roles**: name (UNIQUE)
- **tickets**: created_by_id, assigned_to_id, status, priority
- **comments**: ticket_id, user_id
- **help_topics**: name (UNIQUE), parent_id
- **canned_responses**: created_by_id, category
- **verifications**: ticket_id, requested_by_id, verifier_id, status
- **escalation_rules**: name (UNIQUE)
- **escalation_tiers**: rule_id, level
