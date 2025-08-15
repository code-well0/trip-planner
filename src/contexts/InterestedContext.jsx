import React, { createContext, useContext, useState, useEffect } from "react";

const InterestedContext = createContext();

export const useInterested = () => useContext(InterestedContext);

export const InterestedProvider = ({ children }) => {
  const [interestedTours, setInterestedTours] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("interestedTours");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem("interestedTours", JSON.stringify(interestedTours));
  }, [interestedTours]);

  const addToInterested = (tour) => {
    if (!interestedTours.some(t => t.id === tour.id)) {
      setInterestedTours(prev => [...prev, tour]);
    }
  };

  const removeFromInterested = (id) => {
    setInterestedTours(prev => prev.filter(t => t.id !== id));
  };

  return (
    <InterestedContext.Provider
      value={{ interestedTours, addToInterested, removeFromInterested }}
    >
      {children}
    </InterestedContext.Provider>
  );
};
