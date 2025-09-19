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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 group">
      <img
        src={tour.image}
        alt={tour.name}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        role="img"
        aria-label={tour.name}
      />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2" tabIndex={0} aria-label={`Tour name: ${tour.name}`}>
          <FaMapMarkerAlt className="text-blue-500" />
          {tour.emoji && <span>{tour.emoji}</span>} {tour.name}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({tour.region})
          </span>
        </h3>

        <div className="flex-grow">
          <p className="text-gray-500 dark:text-gray-300 text-base mb-4">
            {description}
            <span
              onClick={() => setReadmore(!readmore)}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer ml-1"
            >
              {readmore ? 'Show Less' : 'Read More'}
            </span>
          </p>
          
          {/* Tags Section */}
          <div className="mb-4">
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
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold text-lg">
            <FaRupeeSign /> {tour.price.toLocaleString('en-IN')}
          </span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
            <FaRegCalendarAlt /> {tour.duration}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
            onClick={() => addToInterested(tour)}
            aria-label={`Mark ${tour.name} as Interested`}
          >
            I'm Interested
          </button>
          <div className="flex items-center gap-2">
            {locked ? (
              <div className="text-xs text-yellow-600">Locked by {locked.lockedBy}</div>
            ) : null}
            <button
            className="flex items-center justify-center gap-2
         px-3 py-1.5
         rounded-md
         bg-gray-100 dark:bg-gray-700
         text-gray-700 dark:text-white text-sm font-medium
         hover:bg-red-100 dark:hover:bg-red-900
         hover:text-red-600 dark:hover:text-red-400
         border border-gray-200 dark:border-gray-600
         transition-all duration-200"
            onClick={() => {
              // Remove from main plan (also propagates to Firestore when collaborating)
              if (typeof removeTour === 'function') removeTour(tour.id);
              // Also remove from interested list if the hook supports it
              // ...existing code handles interested separately via context
            }}
            aria-label={`Remove ${tour.name} from Plan`}
          >
            <FaRegThumbsDown className="text-lg" /> Not Interested
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;