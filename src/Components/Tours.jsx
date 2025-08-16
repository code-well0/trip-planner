import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { FaArrowUp } from "react-icons/fa"

const Tours = ({ tours, removeTour }) => {
  const [interestedTours, setInterestedTours] = useState(() => {
    const saved = localStorage.getItem('interestedTours');
    return saved ? JSON.parse(saved) : [];
  });

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    localStorage.setItem('interestedTours', JSON.stringify(interestedTours));
  }, [interestedTours]);

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
    setInterestedTours(prev => prev.filter(tour => tour.id !== id));
  };

  const handleAddToInterested = (tour) => {
    if (!interestedTours.find(t => t.id === tour.id)) {
      setInterestedTours([...interestedTours, tour]);
    }
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
            addToInterested={handleAddToInterested}
          />
        ))}
      </div>

      {/* Interested Tours Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h3 className="text-xl font-bold mb-3">⭐ Interested Tours</h3>
        {interestedTours.length === 0 ? (
          <p className="text-gray-500">No tours marked as interested yet.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {interestedTours.map(tour => (
              <li key={tour.id}>{tour.name}</li>
            ))}
          </ul>
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
