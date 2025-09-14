import React, { useState } from 'react';
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
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  const { theme } = useTheme();
  return (
    <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-xl 
     transition-all duration-500 
     hover:shadow-[0_0_25px_6px_rgba(96,165,250,0.8)] m-0.1 mx-1`}  >
      <button
        onClick={onClick}
        className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none"
      >
        <span className="text-lg font-medium">{faq.question}</span>
        <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
      </button>
      {isOpen && (
        <div className={`px-6 pb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const { theme } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  const handleToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        </div>
        <div className={`rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-1`}>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openFaq === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/plan"
            className={`inline-block px-6 py-2 rounded-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;