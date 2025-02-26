/*
  # Initial Schema Setup

  1. Tables
    - profiles
      - Extends auth.users with additional user data
      - Stores membership level and profile information
    - ai_agents
      - Stores AI agent listings
      - Includes metadata, status, and verification info
    - reviews
      - Stores user reviews for AI agents
      - Links to both users and agents
    - submissions
      - Tracks AI agent submission process
      - Includes admin feedback and status updates

  2. Security
    - Enable RLS on all tables
    - Set up access policies for different user roles
*/

-- Create custom types
CREATE TYPE membership_level AS ENUM ('admin', 'developer', 'user');
CREATE TYPE submission_status AS ENUM ('pending', 'in_review', 'approved', 'rejected');

-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  membership_level membership_level DEFAULT 'user'::membership_level,
  bio TEXT,
  website TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- AI Agents table
CREATE TABLE ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id UUID REFERENCES profiles(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL,
  status submission_status DEFAULT 'pending'::submission_status,
  is_featured BOOLEAN DEFAULT false,
  version TEXT NOT NULL,
  repository_url TEXT,
  documentation_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES ai_agents(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES ai_agents(id) NOT NULL,
  reviewer_id UUID REFERENCES profiles(id),
  status submission_status DEFAULT 'pending'::submission_status,
  feedback TEXT,
  security_review TEXT,
  performance_review TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- AI Agents policies
CREATE POLICY "Published agents are viewable by everyone"
  ON ai_agents FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Developers can view their own pending agents"
  ON ai_agents FOR SELECT
  USING (auth.uid() = developer_id);

CREATE POLICY "Developers can create agents"
  ON ai_agents FOR INSERT
  WITH CHECK (auth.uid() = developer_id);

CREATE POLICY "Developers can update their own agents"
  ON ai_agents FOR UPDATE
  USING (auth.uid() = developer_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Submissions policies
CREATE POLICY "Admins can view all submissions"
  ON submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND membership_level = 'admin'
  ));

CREATE POLICY "Developers can view own submissions"
  ON submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM ai_agents
    WHERE ai_agents.id = submissions.agent_id
    AND ai_agents.developer_id = auth.uid()
  ));

-- Functions
CREATE OR REPLACE FUNCTION get_average_rating(agent_id UUID)
RETURNS FLOAT AS $$
  SELECT COALESCE(AVG(rating), 0)
  FROM reviews
  WHERE agent_id = $1;
$$ LANGUAGE SQL STABLE;