import React from 'react';
import Card from './Card.jsx';

const Tours = ({ tours, removeTour }) => {
  const handleRemove = (id) => {
    removeTour(id);
  };

  return (
    <section className="container" aria-label="Tours list">
      {/* 🧳 Tour cards */}
      <div className="cardsContainer">
        {tours.map((tour) => (
          <Card key={tour.id} tour={tour} getRemoveId={handleRemove} />
        ))}
      </div>
    </section>
  );
};

export default Tours;
