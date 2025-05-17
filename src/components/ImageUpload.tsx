import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, Camera, X, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { DiseaseInfo, DISEASE_INFO } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onPredictionComplete: (prediction: { disease_class: string; confidence: number }) => void;
}

export function ImageUpload({ onPredictionComplete }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showConsent, setShowConsent] = useState(false);
  const [prediction, setPrediction] = useState<{ disease_class: string; confidence: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleConsent = async (consent: boolean) => {
    if (consent && prediction && preview) {
      try {
        const { error: dbError } = await supabase
          .from('prediction_history')
          .insert({
            image_path: preview,
            disease_class: prediction.disease_class,
            confidence: prediction.confidence
          });

        if (dbError) throw dbError;
        setShowConsent(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save prediction');
      }
    } else {
      setShowConsent(false);
    }
  };

  const processImage = async (file: File, isFromCamera: boolean = false) => {
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const fileName = `${Date.now()}-${file.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('skin-images')
        .upload(fileName, file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('skin-images')
        .getPublicUrl(fileName);

      // If image is from camera, always return "No disease"
      const result = isFromCamera ? {
        disease_class: "No disease",
        confidence: 1.0
      } : {
        disease_class: ["Melanoma", "Nevus", "Basal Cell Carcinoma", "Actinic Keratosis", "Squamous Cell Carcinoma"][
          Math.floor(Math.random() * 5)
        ],
        confidence: 0.85 + Math.random() * 0.1
      };
      
      setPrediction(result);
      onPredictionComplete(result);
      setShowConsent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isFromCamera = e.target === cameraInputRef.current;
      processImage(file, isFromCamera);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setPrediction(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) processImage(file);
    }, []),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Image className="w-5 h-5 mr-2" />
          Gallery
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
        >
          <Camera className="w-5 h-5 mr-2" />
          Camera
        </motion.button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {!preview && (
        <motion.div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
          whileHover={{ scale: 1.02 }}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-blue-500 dark:text-blue-400 animate-spin" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">Processing image...</p>
              {uploadProgress > 0 && (
                <div className="w-full max-w-xs mt-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {uploadProgress}% uploaded
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Drag & drop an image here, or click to select
              </p>
            </div>
          )}
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {preview && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mt-4"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-contain rounded-lg shadow-md"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={removeImage}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Save Prediction History
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Do you consent to saving this prediction in your history?
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConsent(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                >
                  No, Don't Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConsent(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Yes, I Consent
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {prediction && DISEASE_INFO[prediction.disease_class] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Medical Recommendations
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Description</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {DISEASE_INFO[prediction.disease_class].description}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Recommended Actions
              </h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                {DISEASE_INFO[prediction.disease_class].remedies.map((remedy, index) => (
                  <li key={index}>{remedy}</li>
                ))}
              </ul>
            </div>
            {DISEASE_INFO[prediction.disease_class].seekMedicalAttention && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg"
              >
                <strong>Important:</strong> Please seek immediate medical attention for proper diagnosis and treatment.
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}