import React, { useState, useEffect } from "react";
import data from "../data";
import Tours from "../Components/Tours";
import Refresh from "../Components/Refresh";
import "../index.css";
import "../Components/Navbar.css";

export default function PlanTrip({searchQuery}) {
  const [tour, setTour] = useState(data);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const regions = ["All", "North", "South", "East", "West"];
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowRegionDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function removeTour(id) {
    const newTour = tour.filter((tour) => tour.id !== id);
    setTour(newTour);
  }

  // Function to sort tours by price
  const getSortedTours = (tours) => {
    if (sortBy === "price-low") {
      return [...tours].sort((a, b) => parseFloat(a.price.replace(/,/g, "")) - parseFloat(b.price.replace(/,/g, "")));
    }
    if (sortBy === "price-high") {
      return [...tours].sort((a, b) => parseFloat(b.price.replace(/,/g, "")) - parseFloat(a.price.replace(/,/g, "")));
    }
    return tours;
  };

  // First filter by region, then sort
  const filteredTours = tour.filter((t) => {
    const matchesRegion = selectedRegion === "All" || t.region === selectedRegion;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const sortedAndFilteredTours = getSortedTours(filteredTours);

  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setShowRegionDropdown(false);
  };

  // Handle sort selection
  const handleSortSelect = (sortValue) => {
    setSortBy(sortValue);
    setShowSortDropdown(false);
  };

  if (sortedAndFilteredTours.length === 0) {
    return (
      <Refresh
        setTour={setTour}
        data={data}
        setSelectedRegion={setSelectedRegion}
      />
    );
  }

return (
  <div className="plan-trip-container">
    {/* Heading */}
    <div className="title-section">
      <h2 className="trip-title">Your Trip Planner</h2>
    </div>

    {/* Filter and Sort Controls */}
    <div className="dropdowns-wrapper">
      {/* Region Dropdown */}
      <div className="dropdown-container">
        <button
          className="dropdown-btn"
          onClick={() => {
            setShowRegionDropdown(!showRegionDropdown);
            setShowSortDropdown(false);
          }}
        >
          Region: {selectedRegion} ▼
        </button>
        {showRegionDropdown && (
          <div className="dropdown-menu">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionSelect(region)}
                className={`dropdown-item ${selectedRegion === region ? "active" : ""}`}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="dropdown-container">
        <button
          className="dropdown-btn"
          onClick={() => {
            setShowSortDropdown(!showSortDropdown);
            setShowRegionDropdown(false);
          }}
        >
          Sort: {sortOptions.find(option => option.value === sortBy)?.label} ▼
        </button>
        {showSortDropdown && (
          <div className="dropdown-menu">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`dropdown-item ${sortBy === option.value ? "active" : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Tours List */}
    <Tours
      tours={sortedAndFilteredTours}
      removeTour={removeTour}
      setSelectedRegion={setSelectedRegion}
    />
  </div>
);
}
