/*
  # Storage bucket and policies for image uploads

  1. Changes
    - Creates a public storage bucket for skin images
    - Adds policy for anonymous uploads with size and type restrictions
    - Adds policy for anonymous downloads
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
  length(file) < 5000000 AND -- 5MB file size limit
  (LOWER(storage.extension(name)) = 'png' OR
   LOWER(storage.extension(name)) = 'jpg' OR
   LOWER(storage.extension(name)) = 'jpeg')
);

-- Policy for anonymous downloads
CREATE POLICY "Allow anonymous downloads from skin-images"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'skin-images');