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

// Handler to add a tour to "Interested"
const handleAddToInterested = (tour) => {
  if (!interestedTours.find(t => t.id === tour.id)) {
    setInterestedTours([...interestedTours, tour]);
  }
};

  return (
    <div className="toursWrapper">
      <div className="cardsGrid">
        {tours.map((tour) => (
          <Card 
          addToInterested={handleAddToInterested}
          key={tour.id} 
          tour={tour} 
          getRemoveId={getId} 
          />
        ))}
      </div>

      <div>
        <h3>Interested Tours</h3>
        {interestedTours.length === 0 && <p>No tours marked as interested yet.</p>}
        {interestedTours.map(tour => (
          <div key={tour.id}>{tour.name}</div>
        ))}
      </div>
    </div>

    
  );
};

export default Tours;