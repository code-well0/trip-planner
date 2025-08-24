import React from 'react';
import { useParams, Link } from "react-router-dom";
import data from '../data';
import { FaMapMarkerAlt, FaRupeeSign, FaRegCalendarAlt, FaArrowLeft, FaTag } from 'react-icons/fa';
import { useInterested } from '../contexts/InterestedContext';
import { toast } from 'react-toastify';

const Tag = ({ text, colorClass }) => (
  <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1 ${colorClass}`}>
    {text}
  </span>
);

export default function DestinationPage() {
  const { id } = useParams();
  const { addToInterested } = useInterested();

  // Find the destination from the main data source
  const destination = data.find(d => d.name.toLowerCase() === id.toLowerCase());

  const handleAddToInterested = () => {
    addToInterested(destination);
    toast.success(`${destination.name} added to your interested list!`);
  };

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-13rem)] text-center px-4">
        <FaMapMarkerAlt className="text-6xl text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Destination Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Sorry, we couldn't find the destination you're looking for.
        </p>
        <Link
          to="/plan"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 animate-fadeIn">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/plan" className="text-blue-500 hover:text-blue-700 flex items-center gap-2 mb-4">
            <FaArrowLeft /> Back to all destinations
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            {destination.emoji} {destination.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{destination.region}, {destination.country}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Image and Map */}
          <div className="lg:col-span-3">
            <img src={destination.image} alt={destination.name} className="w-full h-auto object-cover rounded-2xl shadow-lg mb-8" />
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <iframe
                src={destination.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${destination.name} Map`}
              ></iframe>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About this destination</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{destination.info}</p>
            
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xl"><FaRupeeSign /> {destination.price.toLocaleString('en-IN')}</span>
              <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-md"><FaRegCalendarAlt /> {destination.duration}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white"><FaTag /> Tags</h3>
              <div className="flex flex-wrap gap-2">
                {destination.themeTags?.map(tag => <Tag key={tag} text={tag} colorClass="bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300" />)}
                {destination.moodTags?.map(tag => <Tag key={tag} text={tag} colorClass="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300" />)}
                {destination.purposeTags?.map(tag => <Tag key={tag} text={tag} colorClass="bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300" />)}
              </div>
            </div>

            <button
              onClick={handleAddToInterested}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
            >
              I'm Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
