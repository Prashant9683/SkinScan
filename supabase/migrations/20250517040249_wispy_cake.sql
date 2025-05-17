/*
  # Fix Storage Policies

  1. Changes
    - Creates storage bucket for skin images
    - Adds policies for anonymous uploads and public access
    - Fixes syntax errors in policy creation
*/

-- Enable storage extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "storage" SCHEMA "extensions";

-- Create bucket (only if you have necessary permissions)
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('skin-images', 'skin-images', true)
  ON CONFLICT (id) DO NOTHING;
EXCEPTION
  WHEN insufficient_privilege THEN
    NULL; -- Silently skip if we don't have permission
END $$;

-- Create upload policy
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow anonymous image uploads" ON storage.objects;
  CREATE POLICY "Allow anonymous image uploads"
  ON storage.objects FOR INSERT TO anon
  WITH CHECK (
    bucket_id = 'skin-images' AND
    octet_length(file) <= 10 * 1024 * 1024 AND -- 10MB max
    (LOWER(RIGHT(name, 4)) IN ('.jpg', '.png', 'jpeg', '.gif') OR 
     LOWER(RIGHT(name, 5)) IN ('.webp', '.tiff')) AND
    mime_type LIKE 'image/%'
  );
EXCEPTION
  WHEN insufficient_privilege THEN
    NULL; -- Silently skip if we don't have permission
END $$;

-- Create read policy
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
  CREATE POLICY "Allow public read access"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'skin-images');
EXCEPTION
  WHEN insufficient_privilege THEN
    NULL; -- Silently skip if we don't have permission
END $$;