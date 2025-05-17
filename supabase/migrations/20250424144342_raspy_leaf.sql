-- Insert sample prediction data
INSERT INTO prediction_history (image_path, disease_class, confidence, created_at)
VALUES
  ('https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg', 'Melanoma', 0.95, NOW() - INTERVAL '2 days'),
  ('https://images.pexels.com/photos/3683075/pexels-photo-3683075.jpeg', 'Basal Cell Carcinoma', 0.88, NOW() - INTERVAL '3 days'),
  ('https://images.pexels.com/photos/3683076/pexels-photo-3683076.jpeg', 'Nevus', 0.92, NOW() - INTERVAL '4 days'),
  ('https://images.pexels.com/photos/3683077/pexels-photo-3683077.jpeg', 'Actinic Keratosis', 0.87, NOW() - INTERVAL '5 days'),
  ('https://images.pexels.com/photos/3683078/pexels-photo-3683078.jpeg', 'Squamous Cell Carcinoma', 0.91, NOW() - INTERVAL '6 days');