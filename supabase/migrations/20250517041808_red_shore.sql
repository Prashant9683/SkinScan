/*
  # Update Prediction History Table

  1. Changes
    - Add policies for anonymous access if they don't exist
    - Ensure idempotent policy creation
*/

-- Create extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the prediction_history table
CREATE TABLE IF NOT EXISTS prediction_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_path text NOT NULL,
  disease_class text NOT NULL,
  confidence float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prediction_history ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous read access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'prediction_history' 
    AND policyname = 'Allow anonymous read access'
  ) THEN
    CREATE POLICY "Allow anonymous read access"
      ON prediction_history
      FOR SELECT
      TO PUBLIC
      USING (true);
  END IF;
END $$;

-- Create policy for anonymous insert access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'prediction_history' 
    AND policyname = 'Allow anonymous insert access'
  ) THEN
    CREATE POLICY "Allow anonymous insert access"
      ON prediction_history
      FOR INSERT
      TO PUBLIC
      WITH CHECK (true);
  END IF;
END $$;