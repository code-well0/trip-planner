import React, { useState } from "react";
import data from "../data";
import Tours from "../Components/Tours";
import Refresh from "../Components/Refresh";
import "../index.css";
import "../Components/Navbar.css";

export default function PlanTrip({searchQuery}) {
  const [tour, setTour] = useState(data);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = ["All", "North", "South", "East", "West"];

  function removeTour(id) {
    const newTour = tour.filter((tour) => tour.id !== id);
    setTour(newTour);
  }

  const filteredTours = tour.filter((t) => {
    const matchRegion = selectedRegion === "All" || t.region === selectedRegion;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchSearch;
  })

  if (filteredTours.length === 0) {
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
        <div className="titleWrapper">
          <h2 className="title">Your Trip Planner</h2>
        </div>
      {/* Region Filter Buttons */}
      <div className="regionFilters">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`regionBtn ${selectedRegion === region ? "active" : ""}`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Tours List */}
      <Tours
        tours={filteredTours}
        removeTour={removeTour}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
}
