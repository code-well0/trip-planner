import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const TermsOfService = () => {
  const { theme } = useTheme();

  // Add this hook to set the page title
  useEffect(() => {
    document.title = 'Terms of Service | Your Trip Planner';
  }, []);

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p>
              Our platform provides trip planning, expense tracking, and travel recommendation services. We reserve the right to modify or discontinue any service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>
              When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to other accounts</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use the service to harass, abuse, or harm others</li>
              <li>Upload or share harmful or malicious content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p>
              All content and services provided are owned by us and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately for any violation of these terms. You may stop using our services at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              We are not liable for any indirect, incidental, or consequential damages resulting from your use of our services. We do not guarantee the accuracy of travel recommendations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. We will notify users of significant changes through our platform or via email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p>
              These terms shall be governed by the laws of the jurisdiction where our company is registered, without regard to its conflict of law provisions.
            </p>
          </section>

          <div className="mt-12 text-center">
            <Link 
              to="/" 
              className={`inline-block px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transform hover:-translate-y-1 transition duration-300`}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;