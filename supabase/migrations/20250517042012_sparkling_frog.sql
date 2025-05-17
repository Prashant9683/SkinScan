/*
  # Add storage policies for skin-images bucket

  1. Changes
    - Create storage bucket for skin images if it doesn't exist
    - Add policy to allow anonymous uploads to skin-images bucket
    - Add policy to allow anonymous downloads from skin-images bucket
    
  2. Security
    - Enables public access for demo purposes
    - Restricts file types to images only
    - Sets reasonable file size limits
*/

-- Create the storage bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('skin-images', 'skin-images', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Policy for anonymous uploads
CREATE POLICY "Allow anonymous uploads to skin-images"
ON storage.objects FOR INSERT TO anon
WITH CHECK (
  bucket_id = 'skin-images' AND
  octet_length(content) < 5000000 AND -- 5MB file size limit
  (LOWER(storage.extension(name)) = 'png' OR
   LOWER(storage.extension(name)) = 'jpg' OR
   LOWER(storage.extension(name)) = 'jpeg')
);

-- Policy for anonymous downloads
CREATE POLICY "Allow anonymous downloads from skin-images"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'skin-images');