import React from "react";
import { useInterested } from "../contexts/InterestedContext";
import Card from "../Components/Card";

const Interested = () => {
  const { interestedTours, removeFromInterested } = useInterested();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interestedTours.length > 0 ? (
        interestedTours.map((tour) => (
          <Card
            key={tour.id}
            tour={tour}
            getRemoveId={removeFromInterested}
          />
        ))
      ) : (
        <p className="text-gray-500">No interested tours yet.</p>
      )}
    </div>
  );
};

export default Interested;
