import React, { useState } from 'react';
import { FaRupeeSign, FaMapMarkerAlt, FaRegCalendarAlt, FaRegThumbsDown } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useInterested } from '../contexts/InterestedContext';

const Card = ({ tour, getRemoveId }) => {
  const { theme } = useTheme();
  const { addToInterested } = useInterested(); 
  const [readmore, setReadmore] = useState(false);

  const description = readmore
    ? tour.info
    : `${tour.info.substring(0, 200)}...`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 group">
      <img
        src={tour.image}
        alt={tour.name}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          {tour.emoji && <span>{tour.emoji}</span>} {tour.name}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({tour.region})
          </span>
        </h3>

        <p className="text-gray-500 dark:text-gray-300 text-base mb-4">
          {description}
          <span
            onClick={() => setReadmore(!readmore)}
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer ml-1"
          >
            {readmore ? 'Show Less' : 'Read More'}
          </span>
        </p>

        {tour.mapUrl && (
          <iframe
            title={`${tour.name} Map`}
            src={tour.mapUrl}
            width="100%"
            height="150"
            loading="lazy"
            className="rounded-lg mb-4"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold text-lg">
            <FaRupeeSign /> {tour.price}
          </span>
          <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-sm">
            <FaRegCalendarAlt /> {tour.duration}
          </span>
        </div>

        <div className="mt-auto flex justify-between gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
            onClick={() => addToInterested(tour)}
          >
            Interested
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-medium hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-600 transition-all duration-200"
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
