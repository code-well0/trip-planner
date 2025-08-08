import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Tours = ({ tours, removeTour }) => {
  const [interestedTours, setInterestedTours] = useState(() => {
    const saved = localStorage.getItem('interestedTours');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('interestedTours', JSON.stringify(interestedTours));
  }, [interestedTours]);

  const getId = (id) => {
    removeTour(id);
    setInterestedTours(prev => prev.filter(tour => tour.id !== id));
  };

  const handleAddToInterested = (tour) => {
    if (!interestedTours.find(t => t.id === tour.id)) {
      setInterestedTours([...interestedTours, tour]);
    }
  };

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
    </div>
  );
};

export default Tours;
