import React, { useState, useEffect } from "react";
import data from "../data";
import Tours from "../Components/Tours";
import Refresh from "../Components/Refresh";
import { FaMapMarkedAlt, FaSearch, FaTimesCircle } from "react-icons/fa";
import "../index.css";
import "../Components/Navbar.css";

export default function PlanTrip() {
  const [tour, setTour] = useState(data);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const regions = ["All", "North", "South", "East", "West"];
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowRegionDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function removeTour(id) {
    const newTour = tour.filter((tour) => tour.id !== id);
    setTour(newTour);
  }

  const getSortedTours = (tours) => {
    if (sortBy === "price-low") {
      return [...tours].sort(
        (a, b) =>
          parseFloat(a.price.replace(/,/g, "")) -
          parseFloat(b.price.replace(/,/g, ""))
      );
    }
    if (sortBy === "price-high") {
      return [...tours].sort(
        (a, b) =>
          parseFloat(b.price.replace(/,/g, "")) -
          parseFloat(a.price.replace(/,/g, ""))
      );
    }
    return tours;
  };

  const filteredTours = tour.filter((t) => {
    const matchesRegion = selectedRegion === "All" || t.region === selectedRegion;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const sortedAndFilteredTours = getSortedTours(filteredTours);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setShowRegionDropdown(false);
  };

  const handleSortSelect = (sortValue) => {
    setSortBy(sortValue);
    setShowSortDropdown(false);
  };

  const handleClearFilters = () => {
    setSelectedRegion("All");
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="px-4 py-10 md:px-16 lg:px-24">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text flex items-center justify-center gap-3 animate-fadeIn">
          <FaMapMarkedAlt className="text-5xl" /> Plan Your Dream Getaway
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Discover the best destinations tailored to your mood and purpose.
        </p>
        <p className="mt-2 text-sm text-gray-500 italic">
          Adventure, culture, or calm — what are you exploring today?
        </p>
      </div>

      {/* Search, Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-10">
  <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white/80 shadow-lg rounded-2xl px-4 py-3 border border-gray-100">
    {/* Region Dropdown */}
    <div className="dropdown-container relative flex-1 min-w-[150px]">
      <button
        className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold shadow transition hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => {
          setShowRegionDropdown(!showRegionDropdown);
          setShowSortDropdown(false);
        }}
      >
        <span><FaMapMarkedAlt className="inline mr-2" />Region: {selectedRegion}</span>
        <span className="ml-2">▼</span>
      </button>
      {showRegionDropdown && (
        <div className="dropdown-menu absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-10 animate-fadeIn border border-gray-100">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionSelect(region)}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors rounded ${
                selectedRegion === region ? "font-bold text-blue-600 bg-blue-50" : ""
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-200 mx-2" />

    {/* Search Bar */}
    <div className="relative flex-1 min-w-[200px]">
      <FaSearch className="absolute top-3 left-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-white"
      />
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-200 mx-2" />

    {/* Sort Dropdown */}
    <div className="dropdown-container relative flex-1 min-w-[150px]">
      <button
        className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-teal-600 text-white font-semibold shadow transition hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        onClick={() => {
          setShowSortDropdown(!showSortDropdown);
          setShowRegionDropdown(false);
        }}
      >
        <span>Sort: {sortOptions.find((option) => option.value === sortBy)?.label}</span>
        <span className="ml-2">▼</span>
      </button>
      {showSortDropdown && (
        <div className="dropdown-menu absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-10 animate-fadeIn border border-gray-100">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`block w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors rounded ${
                sortBy === option.value ? "font-bold text-teal-600 bg-teal-50" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-200 mx-2" />

    {/* Clear Filters */}
    <button
      onClick={handleClearFilters}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all"
    >
      <FaTimesCircle /> Clear
    </button>
  </div>
</div>

       

      {/* Tours List with Improved Card Layout */}
      {sortedAndFilteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <Tours
            tours={sortedAndFilteredTours}
            removeTour={removeTour}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-lg italic animate-fadeIn">
          No destinations found. Try adjusting your search or filters.
        </div>
      )}
    </div>
  );
}
