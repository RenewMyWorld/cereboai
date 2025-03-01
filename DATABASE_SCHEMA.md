# Cerebo AI Database Schema Documentation

## Overview
This document describes the database schema for the Cerebo AI project, capturing the structure and relationships of key tables.

## Tables and Their Structures

### 1. `profiles` Table
- **Purpose**: Store user profile information
- **Columns**:
  - `id` (UUID): Primary key, references `auth.users`
  - `email` (TEXT): User's email address (NOT NULL)
  - `full_name` (TEXT): User's full name
  - `username` (TEXT): User's username
  - `bio` (TEXT): User's biographical information
  - `website` (TEXT): User's website
  - `role` (TEXT): User's role in the system (DEFAULT 'Standard Member')
  - `created_at` (TIMESTAMP): Profile creation timestamp
  - `updated_at` (TIMESTAMP): Last profile update timestamp

### 2. `roles` Table
- **Purpose**: Define available user roles and their descriptions
- **Columns**:
  - `role` (TEXT): Primary key, unique role identifier
  - `description` (TEXT): Detailed description of the role

#### Defined Roles:
1. Administrator
   - Full read/write access across the entire project
2. Standard Member
   - Read/write access to own profile
   - Marketplace access
   - Can communicate with other members
   - Default 10MB storage limit
3. Premium Member
   - All Standard Member privileges
   - Access to developer tools
   - Can list projects in Marketplace
   - 50MB storage limit
4. Standard Developer
   - All Premium Member privileges
   - 50MB storage limit
5. Premium Developer
   - All Standard Developer privileges
   - 100MB storage limit
6. Community Developer
   - All Premium Developer privileges
   - Can review MVPs
7. Community SME
   - All Community Developer privileges
   - Can review and remove unsafe MVPs

### 3. `marketplace` Table
- **Purpose**: Store marketplace items/projects
- **Columns**:
  - `id` (UUID): Primary key
  - `name` (TEXT): Project/item name
  - `short_description` (TEXT): Brief project description
  - `description` (TEXT): Detailed project description
  - `tags` (TEXT[]): Array of tags associated with the project
  - `user_id` (UUID): References `profiles.id`
  - `created_at` (TIMESTAMP): Item creation timestamp
  - `updated_at` (TIMESTAMP): Last item update timestamp

### 4. `role_upgrade_requests` Table
- **Purpose**: Track user role upgrade requests
- **Columns**:
  - `id` (UUID): Primary key
  - `user_id` (UUID): References `profiles.id`
  - `curr_role` (TEXT): Current user role
  - `requested_role` (TEXT): Requested upgrade role
  - `reason` (TEXT): Reason for role upgrade
  - `status` (TEXT): Request status (DEFAULT 'pending')
  - `created_at` (TIMESTAMP): Request creation timestamp
  - `updated_at` (TIMESTAMP): Last request update timestamp

### 5. `mvp_ratings` Table
- **Purpose**: Store ratings for marketplace MVP projects
- **Columns**:
  - `id` (UUID): Primary key
  - `marketplace_id` (UUID): References `marketplace.id`
  - `user_id` (UUID): References `profiles.id`
  - `rating` (INTEGER): Numeric rating (1-5)
  - `review` (TEXT): Optional textual review
  - `created_at` (TIMESTAMP): Rating creation timestamp
  - `updated_at` (TIMESTAMP): Last rating update timestamp

## Security and Access Control
- Row Level Security (RLS) is enabled for all tables
- Policies are implemented to control access based on user roles

## Trigger
A trigger `on_auth_user_created` is set up to automatically create a profile entry when a new user signs up, with a default 'Standard Member' role.

## Database Extensions
- `uuid-ossp` extension is enabled for UUID generation

## Recommended Next Steps
1. Regularly backup the database
2. Monitor and review role upgrade requests
3. Implement additional security measures as needed