import React from 'react';

const Refresh = ({ setTour, data, setSelectedRegion }) => {
  const handleRefresh = () => {
    setTour(data);
    if (setSelectedRegion) setSelectedRegion("All"); // Reset filter too
  };

  return (
    <section className="refresh" aria-live="polite">
      <h2>No tours left</h2>
      <button
        className="refreshBtn"
        type="button"
        onClick={handleRefresh}
        aria-label="Refresh tours"
      >
        Refresh
      </button>
    </section>
  );
};

export default Refresh;
