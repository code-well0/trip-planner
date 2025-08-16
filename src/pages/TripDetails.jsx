import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data";
import { FaArrowLeft, FaMapMarkerAlt, FaRupeeSign, FaRegCalendarAlt } from "react-icons/fa";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = data.find((t) => t.id === parseInt(id));

  if (!tour) {
    return <div className="text-center py-20 text-gray-500">Destination not found.</div>;
  }

  return (
    <div className="px-6 py-10 md:px-16 lg:px-24">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        <FaMapMarkerAlt className="text-blue-500" /> {tour.emoji} {tour.name}
      </h1>
      <p className="text-gray-500 italic mb-6">Region: {tour.region}</p>

      {/* Image */}
      <img
        src={tour.image}
        alt={tour.name}
        className="w-full h-80 object-cover rounded-2xl shadow-lg mb-8"
      />

      {/* Main Info */}
      <p className="text-lg text-gray-700 mb-4">{tour.info}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-800">🌤️ Best Season</h3>
          <p>{tour.bestSeason}</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-800">🍴 Specialty</h3>
          <p>{tour.specialty}</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-800">🏞️ Attraction</h3>
          <p>{tour.attraction}</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 shadow flex items-center gap-2">
          <FaRupeeSign className="text-green-600" /> 
          <p className="font-semibold">{tour.price}</p>
          <FaRegCalendarAlt className="ml-4 text-gray-500" /> 
          <p>{tour.duration}</p>
        </div>
      </div>

      {/* Map */}
      {tour.mapUrl && (
        <iframe
          title={`${tour.name} Map`}
          src={tour.mapUrl}
          width="100%"
          height="300"
          loading="lazy"
          className="rounded-xl shadow-md"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default TripDetails;
