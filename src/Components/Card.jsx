import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInterested } from "../contexts/InterestedContext";
import { useTheme } from "../contexts/ThemeContext";
import Card from "../Components/Card";
import { Heart, Search, MapPin, Star, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Interested = () => {
  const { interestedTours, removeFromInterested } = useInterested();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const isDarkMode = theme === "dark";

  const EmptyState = () => (
    <div className="col-span-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className={`relative ${
          isDarkMode 
            ? "bg-gradient-to-br from-gray-900 to-black border-gray-800" 
            : "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-xl"
        } rounded-3xl border p-8 md:p-16 mx-auto max-w-2xl overflow-hidden`}
      >
        {/* Decorative Animated Blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-6 w-20 h-20 bg-[#27A343] rounded-full blur-xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`absolute bottom-6 left-6 w-16 h-16 ${
            isDarkMode ? "bg-white" : "bg-gray-900"
          } rounded-full blur-lg`}
        />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Floating Heart Icon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#27A343] to-[#1e8a35] rounded-full flex items-center justify-center shadow-lg shadow-[#27A343]/20"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Heart className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 w-24 h-24 md:w-28 md:h-28 border-2 border-[#27A343] opacity-30 rounded-full animate-ping"></div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`text-2xl md:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mb-4 tracking-tight`}
          >
            Your Adventure Awaits
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-base md:text-lg mb-10 leading-relaxed max-w-md`}
          >
            Discover amazing destinations and save your favorite tours. Start building your dream travel collection today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(39, 163, 67, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/plan")}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#27A343] text-white rounded-xl hover:bg-[#239a3d] transition-all duration-300 font-semibold text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-[#27A343] focus:ring-offset-2"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
              Explore Tours
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-3 px-8 py-4 border-2 ${
                isDarkMode 
                  ? "border-gray-700 text-gray-300 hover:border-[#27A343]" 
                  : "border-gray-300 text-gray-600 hover:border-[#27A343]"
              } rounded-xl transition-all duration-300 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[#27A343] focus:ring-offset-2`}
            >
              <MapPin className="w-5 h-5" aria-hidden="true" />
              View Map
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black" : "bg-gray-50"} transition-colors duration-500`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-8 lg:p-12"
      >
        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="fixed top-6 right-6 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-3 rounded-full ${
              isDarkMode 
                ? "bg-gray-800 text-white hover:bg-gray-700" 
                : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg border border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-[#27A343]`}
            aria-label="Toggle theme"
          >
            <motion.div
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-1 h-12 bg-[#27A343] rounded-full origin-bottom"
            />
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } mb-2 tracking-tight`}
              >
                Interested Tours
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Tours Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="wait">
            {interestedTours.length > 0 ? (
              interestedTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                >
                  <Card tour={tour} getRemoveId={removeFromInterested} />
                </motion.div>
              ))
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Interested;
