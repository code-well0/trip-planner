import React, { useState } from 'react';
import { FaRupeeSign, FaMapMarkerAlt, FaRegCalendarAlt, FaRegThumbsDown } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useInterested } from '../contexts/InterestedContext';

const Card = ({ tour, removeTour, lockItem, unlockItem, locked, presence }) => {
  const { theme } = useTheme();
  const { addToInterested } = useInterested(); 
  const [readmore, setReadmore] = useState(false);

  const description = readmore
    ? tour.info
    : `${tour.info.substring(0, 200)}...`;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 group"
      role="article"
      aria-labelledby={`tour-${tour.id}-title`}
    >
      <img
        src={tour.image}
        alt={`Scenic view of ${tour.name}`}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-6 flex flex-col flex-1">
        <h3 
          id={`tour-${tour.id}-title`}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2"
          tabIndex={0}
        >
          <FaMapMarkerAlt className="text-blue-500" aria-hidden="true" />
          {tour.emoji && <span role="img" aria-label="tour emoji">{tour.emoji}</span>} {tour.name}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({tour.region})
          </span>
        </h3>

        <div className="flex-grow">
          <p className="text-gray-500 dark:text-gray-300 text-base mb-4">
            {description}
          </p>
          <button
            onClick={() => setReadmore(!readmore)}
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium focus:outline-none"
            type="button"
            aria-expanded={readmore}
            aria-controls={`tour-${tour.id}-description`}
          >
            {readmore ? 'Show Less' : 'Read More'}
          </button>

          {/* Tags Section */}
          <div className="mt-4 mb-4">
            <div className="flex flex-wrap gap-2 text-xs">
              {tour.themeTags?.map((tag) => (
                <span key={tag} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">{tag}</span>
              ))}
              {tour.moodTags?.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">{tag}</span>
              ))}
              {tour.purposeTags?.map((tag) => (
                <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Duration */}
        <div className="flex items-center justify-between mb-4">
          <span 
            className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold text-lg"
            aria-label={`Price: ₹${tour.price.toLocaleString('en-IN')}`}
          >
            <FaRupeeSign aria-hidden="true" /> {tour.price.toLocaleString('en-IN')}
          </span>
          <span 
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm"
            aria-label={`Duration: ${tour.duration}`}
          >
            <FaRegCalendarAlt aria-hidden="true" /> {tour.duration}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
            onClick={() => addToInterested(tour)}
            aria-label={`Mark ${tour.name} as Interested`}
            type="button"
          >
            I'm Interested
          </button>
          <div className="flex items-center gap-2">
            {locked ? (
              <div className="text-xs text-yellow-600" aria-label={`Locked by ${locked.lockedBy}`}>
                Locked by {locked.lockedBy}
              </div>
            ) : null}
            <button
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-600 transition-all duration-200"
              onClick={() => {
                if (typeof removeTour === 'function') removeTour(tour.id);
              }}
              aria-label={`Remove ${tour.name} from Plan`}
              type="button"
            >
              <FaRegThumbsDown className="text-lg" aria-hidden="true" /> Not Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
