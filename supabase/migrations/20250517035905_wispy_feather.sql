/*
  # Add storage policies for skin-images bucket

  1. Changes
    - Create storage bucket if it doesn't exist
    - Add policies for anonymous users to:
      - Upload images (with size and type restrictions)
      - Read uploaded images
  
  2. Security
    - Restrict file types to images only
    - Limit file size to 10MB
    - Enable public read access
    - Enable anonymous uploads
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('skin-images', 'skin-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow anonymous uploads with restrictions
CREATE POLICY "Allow anonymous image uploads"
ON storage.objects FOR INSERT TO anon
WITH CHECK (
  bucket_id = 'skin-images' AND
  octet_length(content) <= 10 * 1024 * 1024 AND -- 10MB max
  (LOWER(RIGHT(name, 4)) IN ('.jpg', '.png', 'jpeg', '.gif') OR 
   LOWER(RIGHT(name, 5)) IN ('.webp', '.tiff')) AND
  mime_type LIKE 'image/%'
);

-- Policy to allow public read access
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'skin-images');