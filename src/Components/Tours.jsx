import React from 'react';
import Card from './Card.jsx';

const Tours = ({ tours, removeTour }) => {
  function getId(id) {
    removeTour(id);
  }

  return (
    <>
      {tours.map((tour) => (
        <Card key={tour.id} tour={tour} getRemoveId={getId} />
      ))}
    </>
  );
};

export default Tours;