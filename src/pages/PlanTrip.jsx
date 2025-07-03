import React, { useState } from "react";
import data from "../data"; // use correct relative path
import Tours from "../Components/Tours";
import Refresh from "../Components/Refresh";
import "../index.css"; 
import "../Components/Navbar.css";




export default function PlanTrip() {
  const [tour, setTour] = useState(data);
  const [selectedRegion, setSelectedRegion] = useState("All");

  function removeTour(id) {
    const newTour = tour.filter(tour => tour.id !== id);
    setTour(newTour);
  }

  const filteredTours = selectedRegion === "All"
    ? tour
    : tour.filter(t => t.region === selectedRegion);

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
    
      <Tours
        tours={filteredTours}
        removeTour={removeTour}
        setSelectedRegion={setSelectedRegion}
      />   
  );
}

