import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaQuestionCircle, FaTools, FaEnvelope } from 'react-icons/fa';

const HelpCenter = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <FaQuestionCircle className="text-5xl text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Help Center</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>How can we help you today?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaTools /> Troubleshooting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Having trouble logging in?</li>
              <li>Issues with planning a trip?</li>
              <li>Expense tracker not working?</li>
            </ul>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaEnvelope /> Contact Support</h2>
            <p>
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Link to="/contact" className="text-blue-500 hover:underline mt-4 inline-block">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className={`inline-block px-6 py-2 rounded-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;