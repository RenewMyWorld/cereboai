/*
  # Create membership level enum and profiles table

  1. New Types
    - `membership_level` enum with values: 'admin', 'developer', 'user'
  
  2. Tables
    - Update profiles table to use the new enum type
    
  3. Security
    - Enable RLS on profiles table
    - Add policies for different membership levels
*/

-- Create the membership_level enum type
CREATE TYPE membership_level AS ENUM ('admin', 'developer', 'user');

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
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

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for Members and Developers
-- 1. Read own profile only
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (
  auth.uid() = id 
  AND membership_level IN ('user', 'developer')
);

-- 2. Create own profile
CREATE POLICY "Users can create own profile"
ON profiles FOR INSERT
WITH CHECK (
  auth.uid() = id 
  AND membership_level IN ('user', 'developer')
);

-- 3. Update own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (
  auth.uid() = id 
  AND membership_level IN ('user', 'developer')
)
WITH CHECK (
  auth.uid() = id 
  AND membership_level IN ('user', 'developer')
);

-- 4. Delete own profile
CREATE POLICY "Users can delete own profile"
ON profiles FOR DELETE
USING (
  auth.uid() = id 
  AND membership_level IN ('user', 'developer')
);

-- Create policies for Admins
-- Full CRUD access for admins
CREATE POLICY "Admins have full access"
ON profiles
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND membership_level = 'admin'
  )
);

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();