import React from 'react';
import { Info } from 'lucide-react';

export function Instructions() {
  return (
    <div className="mb-6 bg-blue-50 rounded-lg p-4">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            Instructions for best results
          </h3>
          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>• Ensure good lighting conditions</li>
            <li>• Keep the camera steady and focused</li>
            <li>• Center the affected area in the frame</li>
            <li>• Use a neutral background if possible</li>
            <li>• Images should be clear and well-lit</li>
          </ul>
        </div>
      </div>
    </div>
  );
}