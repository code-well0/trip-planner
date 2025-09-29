import React from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "../Components/SplitText";
import FadeContent from "../Components/FadeContent"; 

const testimonials = [
  {
    name: "Ananya",
    role: "Traveler",
    feedback:
      "Trip Planner made my vacation so much easier! I could plan everything in one place.",
  },
  {
    name: "Rahul",
    role: "Adventure Enthusiast",
    feedback:
      "I loved how smooth the planning process was. Highly recommend this app!",
  },
  {
    name: "Sophia",
    role: "Backpacker",
    feedback:
      "Clean UI, easy to use, and perfect for organizing trips with friends!",
  },
  {
    name: "David",
    role: "Solo Explorer",
    feedback:
      "Managing my budget on the go was super easy. This app is a must-have!",
  },
  {
    name: "Meera",
    role: "Family Planner",
    feedback:
      "Helped me organize a family trip without any stress. Kids loved the experience!",
  },
  {
    name: "Alex",
    role: "Photographer",
    feedback:
      "AI recommendations took me to hidden gems I’d never have found otherwise.",
  },
  {
    name: "Li Wei",
    role: "Student Traveler",
    feedback:
      "Affordable trip planning and amazing suggestions within my budget.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ✅ Hero Section (simple built-in, no import needed) */}
      <section
        className="relative bg-gradient-to-r from-indigo-800 via-purple-800 to-black
 text-white py-24 text-center"
      >
        {/* <h1 className="text-5xl font-extrabold mb-4">YourTrip Planner 🌍</h1> */}
        <SplitText
          text="YourTrip Planner 🌍"
          className="text-5xl font-extrabold text-center py-14"
          delay={50}
          duration={0.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <p className="text-lg max-w-2xl mx-auto">
          Plan your next adventure, track expenses, and get AI-powered
          recommendations. All in one place.
        </p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600"
          >
            Signup
          </button>
        </div>
        {/* Animated Plane Icon */} 
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Features */}
        <FadeContent
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
        >
          <h2 className="text-3xl flex items-center justify-center font-bold mb-12 text-gray-800 dark:text-white">
            Why Choose YourTripPlanner?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto my-16">
            <div className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition">
              <span className="text-4xl">🗺️</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                AI-Powered Itineraries
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Plan trips in seconds with AI assistance.
              </p>
            </div>
            <div className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition">
              <span className="text-4xl">💰</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Track Expenses
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Stay on budget while traveling.
              </p>
            </div>
            <div className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition">
              <span className="text-4xl">🌍</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Smart Recommendations
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Get personalized destination suggestions.
              </p>
            </div>
            <div
              onClick={() => navigate("/plan")}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Plan Your Trip
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover amazing destinations and create your perfect itinerary.
              </p>
            </div>

            <div
              onClick={() => navigate("/expenses")}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Track Expenses
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep track of your travel budget and expenses in real-time.
              </p>
            </div>


            <div
              onClick={() => navigate("/features")}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                View Features
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore all the amazing features YourTrip Planner has to offer.
              </p>
            </div>

            <div
              onClick={() => navigate("/api/chat")}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                AI Assistant
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized travel recommendations powered by AI.
              </p>
            </div>
          </div>
        </FadeContent>

        {/* ✅ Testimonials */}
        <section className="bg-gray-100 dark:bg-gray-800 py-12 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white my-10">
            What Our Travelers Say
          </h2>
          <div className="flex overflow-x-auto gap-6 px-4">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg my-8"
              >
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  "{t.feedback}"
                </p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
