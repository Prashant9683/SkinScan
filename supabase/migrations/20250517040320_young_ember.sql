/*
  # Create Prediction History Table

  1. New Tables
    - `prediction_history`
      - `id` (uuid, primary key)
      - `image_path` (text, stores URL to uploaded image)
      - `disease_class` (text, predicted disease name)
      - `confidence` (float, prediction confidence score)
      - `created_at` (timestamp with timezone, auto-generated)

  2. Security
    - Enable RLS on `prediction_history` table
    - Add policies for anonymous access
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
CREATE POLICY "Allow anonymous read access"
  ON prediction_history
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Create policy for anonymous insert access
CREATE POLICY "Allow anonymous insert access"
  ON prediction_history
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);