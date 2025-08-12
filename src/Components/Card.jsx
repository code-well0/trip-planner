import React, { useState } from 'react';
import { FaRupeeSign, FaMapMarkerAlt, FaRegCalendarAlt, FaRegThumbsDown } from 'react-icons/fa';

const Card = ({ tour, getRemoveId, addToInterested }) => {
  const [readmore, setReadmore] = useState(false);
  const description = readmore ? tour.info : `${tour.info.substring(0, 200)}...`;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100 group">
      <img
        src={tour.image}
        alt={tour.name}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          {tour.emoji && <span>{tour.emoji}</span>} {tour.name}
          <span className="ml-2 text-sm text-gray-500">({tour.region})</span>
        </h3>

        <p className="text-gray-500 text-base mb-4">
          {description}
          <span
            onClick={() => setReadmore(!readmore)}
            className="text-blue-500 cursor-pointer ml-1"
          >
            {readmore ? "Show Less" : "Read More"}
          </span>
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1 text-green-600 font-bold text-lg">
            <FaRupeeSign /> {tour.price}
          </span>
          <span className="flex items-center gap-1 text-gray-400 text-sm">
            <FaRegCalendarAlt /> {tour.duration}
          </span>
        </div>

        <div className="mt-auto flex justify-between gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
            onClick={() => addToInterested && addToInterested(tour)}
          >
            Interested
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-red-100 hover:text-red-600 border border-gray-200 transition-all duration-200"
            onClick={() => getRemoveId(tour.id)}
          >
            <FaRegThumbsDown className="text-lg" /> Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
