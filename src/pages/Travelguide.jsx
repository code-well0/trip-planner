import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, MapPin, Globe, Star, PawPrint } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";

const Travelguide = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [petCurrentIndex, setPetCurrentIndex] = useState(0);

  const tourGuides = [
    {
      id: 1,
      name: "Maria Santos",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&crop=faces",
      expertise: "Cultural & Historical Tours",
      location: "Barcelona, Spain",
      languages: ["Spanish", "English", "Catalan"],
      rating: 4.9,
      description: "Passionate about sharing Barcelona's rich history and hidden gems. Specialized in Gaudí architecture and local culinary experiences.",
      tours: 250
    },
    {
      id: 2,
      name: "Kenji Tanaka",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces",
      expertise: "Adventure & Nature",
      location: "Tokyo, Japan",
      languages: ["Japanese", "English"],
      rating: 5.0,
      description: "Expert in outdoor adventures and traditional Japanese culture. From Mt. Fuji hikes to serene temple visits.",
      tours: 180
    },
    {
      id: 3,
      name: "Amara Johnson",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=faces",
      expertise: "Wildlife & Safari",
      location: "Cape Town, South Africa",
      languages: ["English", "Afrikaans", "Xhosa"],
      rating: 4.8,
      description: "Wildlife expert and safari guide, specializing in Kenya and Tanzania national parks.",
      tours: 320
    },
    {
      id: 4,
      name: "Luca Rossi",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces",
      expertise: "Food & Wine Tours",
      location: "Tuscany, Italy",
      languages: ["Italian", "English", "French"],
      rating: 4.9,
      description: "Third-generation sommelier sharing Tuscan culinary traditions. Wine tasting through scenic vineyard landscapes.",
      tours: 290
    },
    {
      id: 5,
      name: "Sophia Chen",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=faces",
      expertise: "Photography Tours",
      location: "Paris, France",
      languages: ["French", "English", "Mandarin"],
      rating: 5.0,
      description: "Licensed guide for Japan, China, and South Korea. Loves sharing local traditions and cuisine.",
      tours: 210
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=faces",
      expertise: "Desert & Ancient Sites",
      location: "Cairo, Egypt",
      languages: ["Arabic", "English", "German"],
      rating: 4.7,
      description: "Certified mountain guide with 10+ years of experience leading treks in the Indian Himalayas.",
      tours: 400
    }
  ];

  const petGuides = [
    {
      id: 1,
      name: "Weddy Brown",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=faces",
      expertise: "Urban Travel & City Exploration",
      location: "Amsterdam, Netherlands",
      description: "Amsterdam-based guide specializing in urban exploration. Knows every hidden park, café, and unique stay in the city.",
      rating: 4.9
    },
    {
      id: 2,
      name: "Snowy Kat",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces",
      expertise: "Mountain Treks & Pet Adventures",
      location: "Colorado, USA",
      description: "Passionate about guiding pet parents through scenic mountain trails and nature escapes. Specialist in safe trekking experiences for dogs and cats.",
      rating: 5.0
    },
    {
      id: 3,
      name: "Ayushi Uniyal",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&crop=faces",
      expertise: "Coastal Getaways",
      location: "Goa, India",
      description: "Loves helping travelers explore India's beautiful coastline. Expert in coastal accommodations and beach activities.",
      rating: 4.8
    },
    {
      id: 4,
      name: "Max Peterson",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&h=600&fit=crop&crop=faces",
      expertise: "Pet-Friendly Camping",
      location: "Vancouver, Canada",
      description: "Outdoor enthusiast specializing in pet-friendly camping sites. Expert in organizing safe wilderness adventures with your furry friends.",
      rating: 4.9
    },
    {
      id: 5,
      name: "Luna Martinez",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces",
      expertise: "Pet Wellness & Spa",
      location: "Bali, Indonesia",
      description: "Holistic pet travel specialist. Curates wellness retreats combining yoga, spa treatments, and relaxation for pets and owners.",
      rating: 5.0
    },
    {
      id: 6,
      name: "Oliver Thompson",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces",
      expertise: "Dog Park Adventures",
      location: "London, UK",
      description: "Professional dog trainer turned travel guide. Knows the best dog parks, pet cafes, and dog-friendly attractions across Europe.",
      rating: 4.7
    }
  ];

  const filteredTourGuides = useMemo(() => {
    if (!searchQuery.trim()) return tourGuides;
    const query = searchQuery.toLowerCase();
    return tourGuides.filter(guide =>
      guide.name.toLowerCase().includes(query) ||
      guide.expertise.toLowerCase().includes(query) ||
      guide.location.toLowerCase().includes(query) ||
      guide.languages.some(lang => lang.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const filteredPetGuides = useMemo(() => {
    if (!searchQuery.trim()) return petGuides;
    const query = searchQuery.toLowerCase();
    return petGuides.filter(guide =>
      guide.name.toLowerCase().includes(query) ||
      guide.expertise.toLowerCase().includes(query) ||
      guide.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const cardsPerView = 3;
  const maxTourIndex = Math.max(0, filteredTourGuides.length - cardsPerView);
  const maxPetIndex = Math.max(0, filteredPetGuides.length - cardsPerView);

  const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex(prev => Math.min(maxTourIndex, prev + 1));
  const handlePetPrev = () => setPetCurrentIndex(prev => Math.max(0, prev - 1));
  const handlePetNext = () => setPetCurrentIndex(prev => Math.min(maxPetIndex, prev + 1));

  return (
    <div className={`min-h-screen transition-colors duration-500 p-8
                      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100"}
                      `}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 transition-colors duration-500
                          ${theme === "dark"
              ? "text-white"
              : "text-gray-900"
            }`}>
            Meet Our Expert <span className={`text-transparent 
                                             ${theme === "dark"
                ? "bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                : "bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700"
              }`}>Travel Guides</span>
          </h1>
          <p className={` text-lg max-w-2xl mx-auto
                          ${theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
            }`}>
            Connect with experienced local guides who bring destinations to life with authentic stories and insider knowledge
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-16 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, expertise, or location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
                setPetCurrentIndex(0);
              }}
              className={`w-full rounded-full py-4 pl-12 pr-6 transition-all backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                  : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600"}`}
            />
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors
        ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>
        </div>

        {/* Tour Guides Section */}
        <div className="mb-20">
          <div className="relative">
            {filteredTourGuides.length > cardsPerView && (
              <>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= maxTourIndex}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {filteredTourGuides.length > 0 ? (
              <div className="overflow-hidden px-2">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView + 2)}%)` }}
                >
                  {filteredTourGuides.map((guide) => (
                    <div
                      key={guide.id}
                      className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                    >
                      <div className={`h-[520px] flex flex-col border-2 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 group
          ${theme === "dark"
                          ? "bg-gray-800/60 backdrop-blur-sm border-gray-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
                          : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200"
                        }`}>

                        {/* Image section */}
                        <div className={`relative h-64 overflow-hidden bg-gray-700
                     ${theme === "dark"
                            ? "bg-gray-700"
                            : "bg-gray-100"
                          }`}>
                          <img
                            src={guide.photo}
                            alt={guide.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className={`absolute top-4 right-4  backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1
            ${theme === "dark"
                              ? "bg-gray-900/80"
                              : "bg-gray-500"
                            }`}>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className={`font-semibold
          ${theme === "dark"
                                ? "text-white"
                                : "text-gray-950"}`}>{guide.rating}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow p-6">
                          <h3 className={`text-2xl font-bold  mb-2
                        ${theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                            }`}>{guide.name}
                          </h3>
                          <div className={`flex items-center gap-2  mb-3
                         ${theme === "dark"
                              ? "text-blue-400"
                              : "text-blue-600"
                            }`}>
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{guide.location}</span>
                          </div>
                          <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                            ${theme === "dark"
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-purple-100 text-purple-700"}`}>
                              {guide.expertise}
                            </span>
                          </div>
                          <p className={` text-sm mb-4 line-clamp-3
                         ${theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-800"
                            }`}>{guide.description}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <Globe className={`w-4 h-4 
                            ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`} />
                            <div className="flex flex-wrap gap-2">
                              {guide.languages.map((lang, idx) => (
                                <span
                                  key={idx}
                                  className={`text-xs 
                           ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                  {lang}{idx < guide.languages.length - 1 ? ',' : ''}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer stays bottom */}
                          <div className={`mt-auto flex items-center justify-between pt-4 border-t
                            ${theme === "dark"
                              ? "border-gray-700"
                              : "border-gray-200"
                            }`}>
                            <span className={` text-sm
                             ${theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-600"
                              }`}>{guide.tours}+ tours</span>
                            <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className={` text-lg ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>No guides found</div>
              </div>
            )}
          </div>

          {filteredTourGuides.length > cardsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxTourIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pet Guides Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-3 flex items-center justify-center gap-3
                             ${theme === "dark"
                ? "text-white"
                : "text-gray-900"
              }`}>
              <span>🐶</span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r 
                               ${theme === "dark"
                  ? "from-pink-400 to-purple-500"
                  : "from-pink-700 to-purple-800"}`}>Pet Guides</span>
              <span>🐱</span>
            </h2>
            <p className={` text-lg
                                 ${theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"}`}>
              Pet Guide helps you find pet-friendly places and activities for unforgettable trips with your furry friend.
            </p>
          </div>

          <div className="relative">
            {filteredPetGuides.length > cardsPerView && (
              <>
                <button
                  onClick={handlePetPrev}
                  disabled={petCurrentIndex === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 disabled:cursor-not-allowed p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110
                                ${theme === "dark"
                      ? "bg-pink-600 hover:bg-pink-700 text-white disabled:bg-gray-700"
                      : "bg-pink-500 hover:bg-pink-600 text-white disabled:bg-gray-300"}`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handlePetNext}
                  disabled={petCurrentIndex >= maxPetIndex}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 disabled:cursor-not-allowed p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110
                                  ${theme === "dark"
                      ? "bg-pink-600 hover:bg-pink-700 text-white disabled:bg-gray-700"
                      : "bg-pink-500 hover:bg-pink-600 text-white disabled:bg-gray-300"}`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {filteredPetGuides.length > 0 ? (
              <div className="overflow-hidden px-2">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${petCurrentIndex * (100 / cardsPerView + 2)}%)` }}
                >
                  {filteredPetGuides.map((guide) => (
                    <div key={guide.id} className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]">
                      <div className={` border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 group
                                        ${theme === "dark"
                          ? "bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm border-pink-700/50 hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20"
                          : "bg-white border border-pink-200 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-200"
                        }`}>
                        <div className={`relative h-64 overflow-hidden 
                                         ${theme === "dark"
                            ? "bg-gray-700"
                            : "bg-gray-100"
                          }`}>
                          <img
                            src={guide.photo}
                            alt={guide.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 bg-pink-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <PawPrint className="w-4 h-4 text-white" />
                            <span className="text-white font-semibold text-sm">Pet Expert</span>
                          </div>
                          <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1
                                            ${theme === "dark"
                              ? "bg-gray-900/80"
                              : "bg-gray-500"
                            }`}>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className={` font-semibold
                                              ${theme === "dark"
                                ? "text-white"
                                : "text-gray-900"
                              }`}>{guide.rating}</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className={`text-2xl font-bold  mb-2
                                            ${theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                            }`}>{guide.name}
                          </h3>
                          <div className={`flex items-center gap-2 mb-3
                            ${theme === "dark"
                              ? "text-pink-400"
                              : "text-pink-600"
                            }`}>
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{guide.location}</span>
                          </div>
                          <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                                               ${theme === "dark"
                                ? "bg-pink-500/20 text-pink-300"
                                : "bg-pink-100 text-pink-700"}`}>
                              {guide.expertise}
                            </span>
                          </div>
                          <p className={`text-sm mb-6 line-clamp-3
                                          ${theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-600"
                            }`}>
                            {guide.description}
                          </p>
                          <div className={`pt-4 border-t 
                                           ${theme === "dark"
                              ? "border-pink-700/30"
                              : "border-pink-200"}`}>
                            <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className={`text-gray-500 text-lg
                                  ${theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-600"
                  }`}>No pet guides found</div>
              </div>
            )}
          </div>

          {filteredPetGuides.length > cardsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxPetIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPetCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === petCurrentIndex ? 'w-8 bg-pink-500'
                      : theme === "dark"
                        ? "w-2 bg-gray-600 hover:bg-gray-500"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Travelguide;