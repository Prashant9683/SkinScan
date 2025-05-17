import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

export function Navbar() {
  const location = useLocation();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              SkinScan AI
            </h1>
          </motion.div>
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 text-sm font-medium ${
                location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/research"
              className={`flex items-center space-x-1 text-sm font-medium ${
                location.pathname === '/research' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Research</span>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}