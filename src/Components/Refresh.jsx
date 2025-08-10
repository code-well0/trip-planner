import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Refresh = (props) => {
  const { theme } = useTheme();

  return (
    <div className={`refresh ${theme === 'dark' ? 'dark-theme-refresh' : ''}`}>
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
