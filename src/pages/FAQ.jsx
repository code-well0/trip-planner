import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: 'How do I plan a new trip?',
    answer: 'Navigate to the "Plan Trip" page from the navigation bar. You can then browse destinations, filter by region, and add tours to your interested list.',
  },
  {
    question: 'Can I track my expenses?',
    answer: 'Yes! Go to the "Expense Tracker" page. You can add expenses with details like item, amount, date, and category. The tracker will visualize your spending.',
  },
  {
    question: 'What is the AI Assistant?',
    answer: 'The AI Assistant is a chatbot that can help you with travel recommendations, itinerary ideas, and general travel questions. You can find it on the "AI Assistant" page.',
  },
  {
    question: 'How does the Trip Recommender work?',
    answer: 'The Trip Recommender suggests destinations based on your preferences for mood, purpose, and theme. Simply select your criteria and get personalized recommendations.',
  },
  {
    question: 'Can I share my trip with friends?',
    answer: 'Yes, you can share your saved trips and itineraries with friends through a unique shareable link.',
  },
];

const FaqItem = ({ faq, isOpen, onClick, index, isLast }) => {
  const { theme } = useTheme();
  return (
    <div className="flex items-start relative mb-8">
      <div className="flex flex-col items-center mr-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md">
          {index + 1}
        </div>
        {!isLast && <div className="w-1 bg-gray-300 flex-1"></div>}
      </div>

      {/* FAQ Box */}
      <div
        className={`flex-1 border rounded-lg shadow-md transition-all duration-500 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <button
          onClick={onClick}
          className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none"
        >
          <span className="text-lg font-medium">{faq.question}</span>
          <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
        </button>
        {isOpen && (
          <div
            className={`px-6 pb-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FAQ = () => {
  const { theme } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  // Add this hook to set the page title
  useEffect(() => {
    document.title = 'FAQ | Your Trip Planner';
  }, []);

  const handleToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Find Answers to Your Questions</h1>
          <p className="text-gray-500">
            Explore our FAQ in an interactive and fun way. Click on a question to see the answer.
          </p>
        </div>

        {/* FAQ Timeline */}
        <div className="relative">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openFaq === index}
              onClick={() => handleToggle(index)}
              index={index}
              isLast={index === faqs.length - 1}
            />
          ))}
        </div>

<div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
  <div>
    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
      Have more questions?
    </h2>
    <p className="text-gray-600 dark:text-gray-300">
      Connect with us—our team is happy to help at any time.
    </p>
  </div>
  
  <div className="flex flex-col sm:flex-row gap-4">
    <Link
      to="/contact"
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
    >
      Contact Us
    </Link>

  </div>
</div>
        <div className="mt-12 text-center">
          <Link
            to="/plan"
            className={`inline-block px-6 py-2 rounded-full ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transform hover:-translate-y-1 transition duration-300`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;