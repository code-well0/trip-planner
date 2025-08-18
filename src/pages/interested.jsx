import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInterested } from "../contexts/InterestedContext";
import Card from "../Components/Card";
import { Heart, Search, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Interested = () => {
  const { interestedTours, removeFromInterested } = useInterested();
  const navigate = useNavigate()

  const EmptyState = () => (
    <div className="col-span-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 p-8 md:p-16 mx-auto max-w-2xl overflow-hidden"
      >
        {/* Animated decorative elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-6 right-6 w-20 h-20 bg-[#27A343] rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-6 left-6 w-16 h-16 bg-white rounded-full blur-lg"
        />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated icon with floating effect */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#27A343] to-[#1e8a35] rounded-full flex items-center justify-center shadow-lg shadow-[#27A343]/20"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Heart className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 w-24 h-24 md:w-28 md:h-28 border-2 border-[#27A343] opacity-30 rounded-full animate-ping"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
          >
            Your Adventure Awaits
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-md"
          >
            Discover amazing destinations and save your favorite tours. Start building your dream travel collection today.
          </motion.p>

          {/* Animated action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(39, 163, 67, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>navigate('/plan')}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#27A343] text-white rounded-xl hover:bg-[#239a3d] transition-all duration-300 font-semibold text-base shadow-lg"
            >
              <Search className="w-5 h-5" />
              Explore Tours
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "#27A343",
                color: "#27A343"
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-700 text-gray-300 rounded-xl transition-all duration-300 font-semibold text-base"
            >
              <MapPin className="w-5 h-5" />
              View Map
            </motion.button>
          </motion.div>

          {/* Animated stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-gray-800"
          >
            {[
              { value: "500+", label: "Destinations", color: "text-[#27A343]" },
              { value: "4.8", label: "Rating", color: "text-white", icon: <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> },
              { value: "24/7", label: "Support", color: "text-[#27A343]" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                className="text-center cursor-default"
              >
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1 justify-center">
                  {stat.icon}
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-8 lg:p-12"
      >
        {/* Animated Header */}
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight"
              >
                Interested Tours
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-1 w-24 bg-gradient-to-r from-[#27A343] to-transparent rounded-full origin-left"
              />
            </div>
          </div>
          
          <AnimatePresence>
            {interestedTours.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-4 mt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#27A343] text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {interestedTours.length} tour{interestedTours.length !== 1 ? 's' : ''} saved
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex items-center gap-2 text-gray-400 text-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-4 h-4 fill-[#27A343] text-[#27A343]" />
                  </motion.div>
                  Ready for your next adventure
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animated Tours Grid */}
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
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.3
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="transform"
                >
                  <Card
                    tour={tour}
                    getRemoveId={removeFromInterested}
                  />
                </motion.div>
              ))
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animated Bottom CTA when tours exist */}
        <AnimatePresence>
          {interestedTours.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-16 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Search className="w-5 h-5 text-[#27A343]" />
                </motion.div>
                <span className="text-white font-medium">Want to discover more amazing tours?</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-4 px-6 py-2 bg-[#27A343] text-white rounded-lg hover:bg-[#239a3d] transition-colors font-semibold"
                >
                  Browse More
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Interested;