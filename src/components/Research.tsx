import React from 'react';
import { BookOpen, Brain, FlaskRound as Flask, LineChart, Users } from 'lucide-react';

export function Research() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
            <h1 className="text-3xl font-bold mb-4">SkinScan AI Research</h1>
            <p className="text-blue-100 max-w-2xl">
              [Your research introduction will go here]
            </p>
          </div>

          {/* Content Sections */}
          <div className="px-8 py-12 space-y-12">
            {/* Research Inspiration */}
            <section>
              <div className="flex items-center mb-6">
                <Brain className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Research Inspiration</h2>
              </div>
              <div className="prose max-w-none text-gray-600">
                [Your inspiration content will go here]
              </div>
            </section>

            {/* Literature Review */}
            <section>
              <div className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Literature Review</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  [Your literature review content will go here]
                </div>
              </div>
            </section>

            {/* Methodology */}
            <section>
              <div className="flex items-center mb-6">
                <Flask className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Methodology</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Data Collection</h3>
                  [Your data collection content will go here]
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Model Architecture</h3>
                  [Your model architecture content will go here]
                </div>
              </div>
            </section>

            {/* Results */}
            <section>
              <div className="flex items-center mb-6">
                <LineChart className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Results & Analysis</h2>
              </div>
              <div className="prose max-w-none text-gray-600">
                [Your results content will go here]
              </div>
            </section>

            {/* Team */}
            <section>
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Research Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                [Your team member cards will go here]
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}