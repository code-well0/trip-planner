import React, { useState } from "react";
import data from "./data";
import Tours from './Components/Tours';
import Refresh from './Components/Refresh';

const App = () => {
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
    return <Refresh setTour={setTour} data={data} setSelectedRegion={setSelectedRegion} />

  }

  return (
    <Tours
      tours={filteredTours}
      removeTour={removeTour}
      setSelectedRegion={setSelectedRegion}
      selectedRegion={selectedRegion}
    />
  );
};

export default App;
