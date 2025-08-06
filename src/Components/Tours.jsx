import React from 'react';
import Card from './Card.jsx';

const Tours = ({ tours, removeTour }) => {
  function getId(id) {
    removeTour(id);
  }

  return (
    <div className="toursWrapper">
      <div className="cardsGrid">
        {tours.map((tour) => (
          <Card key={tour.id} tour={tour} getRemoveId={getId} />
        ))}
      </div>
    </div>
  );
};

export default Tours;