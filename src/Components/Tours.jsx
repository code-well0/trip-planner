import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { FaArrowUp } from "react-icons/fa"
import { useInterested } from '../contexts/InterestedContext';

const Tours = ({ tours, removeTour }) => {
  const { interestedTours, removeFromInterested } = useInterested();
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowScrollTop(scrollTop > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getId = (id) => {
    removeTour(id);
    removeFromInterested(id);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="toursWrapper px-4 py-8">
      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            tour={tour}
            getRemoveId={getId}
          />
        ))}
      </div>

      {/* Interested Tours Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-2xl">⭐</span> Interested Tours
          {interestedTours.length > 0 && (
            <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {interestedTours.length} tour{interestedTours.length !== 1 ? 's' : ''}
            </span>
          )}
        </h3>
        
        {interestedTours.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tours marked as interested yet.</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Click "I'm Interested" on any tour to add it here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interestedTours.map((tour) => (
              <div key={tour.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{tour.name}</h4>
                  <button
                    onClick={() => removeFromInterested(tour.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>📍 {tour.region}</span>
                  <span>•</span>
                  <span>💰 ₹{tour.price.toLocaleString('en-IN')}</span>
                  <span>•</span>
                  <span>⏱️ {tour.duration}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                  {tour.info.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

    </div>
  );
};

export default Tours;
