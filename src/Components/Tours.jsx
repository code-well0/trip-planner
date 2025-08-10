import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import './Tours.css'; // Assuming Tours.css exists for styling

const Tours = ({ tours, removeTour }) => {
  const { theme } = useTheme(); // Use the custom hook to get the current theme
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
    // Add a conditional class for dark mode
    <div className={`toursWrapper ${theme === 'dark' ? 'dark-theme-tours' : ''}`}>
      <div className="cardsGrid">
        {tours.map((tour) => (
          <Card 
            addToInterested={handleAddToInterested}
            key={tour.id} 
            tour={tour} 
            getRemoveId={getId}
            theme={theme} // Pass the theme prop to the Card component
          />
        ))}
      </div>

      <div className="interested-tours-section">
        <h3 className="text-xl font-bold mb-2">Interested Tours</h3>
        {interestedTours.length === 0 && <p className="text-gray-600 dark:text-gray-400">No tours marked as interested yet.</p>}
        {interestedTours.map(tour => (
          <div key={tour.id} className="p-2 border-b border-gray-200 dark:border-gray-700">{tour.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
