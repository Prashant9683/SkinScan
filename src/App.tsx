import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ImageUpload } from './components/ImageUpload';
import { PredictionHistory } from './components/PredictionHistory';
import { Heart } from 'lucide-react';
import { Instructions } from './components/Instructions';
import { Navbar } from './components/Navbar';
import { Research } from './components/Research';
import { motion, AnimatePresence } from 'framer-motion';

function HomePage() {
  const [currentPrediction, setCurrentPrediction] = useState<{
    disease_class: string;
    confidence: number;
  } | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.section
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Upload Image
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Instructions />
            <ImageUpload onPredictionComplete={setCurrentPrediction} />
          </div>
        </motion.section>

        <motion.section
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            How It Works
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="relative w-full h-0 pb-[56.25%] mb-6 overflow-hidden rounded-lg">
              <img
                src="/derm.jpeg"
                alt="Medical technology illustration"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400">1</div>
                <p className="ml-3 text-gray-600 dark:text-gray-300">
                  Upload a clear image of the skin condition
                </p>
              </motion.div>
              <motion.div 
                className="flex items-start"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400">2</div>
                <p className="ml-3 text-gray-600 dark:text-gray-300">
                  Our AI analyzes the image in seconds
                </p>
              </motion.div>
              <motion.div 
                className="flex items-start"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400">3</div>
                <p className="ml-3 text-gray-600 dark:text-gray-300">
                  Receive instant predictions and recommendations
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {currentPrediction && (
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-100 dark:border-blue-900"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Prediction Result
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Disease:</span>{' '}
                {currentPrediction.disease_class}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Confidence:</span>{' '}
                {(currentPrediction.confidence * 100).toFixed(1)}%
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Prediction History
        </h2>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <PredictionHistory />
        </div>
      </motion.section>
    </motion.div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<Research />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="h-5 w-5 text-red-500" />
              <p className="text-gray-600 dark:text-gray-300">Developed with care by</p>
            </motion.div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">Group - 08</div>
            <p className="text-gray-400 dark:text-gray-500 text-xs text-center">
              © 2025 SkinScan AI. For educational purposes only. Not a
              substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;