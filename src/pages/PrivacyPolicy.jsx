import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPolicy = () => {
  const { theme } = useTheme();

  // Add this hook to set the page title
  useEffect(() => {
    document.title = 'Privacy Policy | Your Trip Planner';
  }, []);

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, plan a trip, or contact us for support. This may include your name, email address, and travel details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to personalize your experience, communicate with you, and for security purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
            <p>
              We do not share your personal information with third parties except as described in this Privacy Policy, such as with your consent or for legal reasons.
            </p>
          </section>
          
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
    </div>
  );
};

export default PrivacyPolicy;