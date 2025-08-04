import React from 'react';

const Refresh = (props) => {
  return (
    <div className="refresh">
      <h2>No tour left</h2>
      <button
        className="refreshBtn"
        onClick={() => {
          props.setTour(props.data);
          if (props.setSelectedRegion) props.setSelectedRegion("All"); // ✅ Reset filter too
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default Refresh;
