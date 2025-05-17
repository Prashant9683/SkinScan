import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Prediction } from '../types';

export function PredictionHistory() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPredictions() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('prediction_history')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('Supabase error details:', supabaseError);
          throw new Error(`Database error: ${supabaseError.message}`);
        }

        if (!data) {
          throw new Error('No data received from database');
        }

        setPredictions(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load predictions';
        console.error('Prediction loading error:', err);
        setError(`Error: ${errorMessage}. Please try refreshing the page or contact support if the problem persists.`);
      } finally {
        setIsLoading(false);
      }
    }

    loadPredictions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
        </div>
        <div className="mt-2 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No predictions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Disease
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confidence
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {predictions.map((prediction) => (
            <tr key={prediction.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={prediction.image_path}
                  alt="Skin condition"
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {prediction.disease_class}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {(prediction.confidence * 100).toFixed(1)}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(prediction.created_at), 'MMM d, yyyy HH:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}