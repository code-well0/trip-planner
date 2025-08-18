import React from "react";

const testimonials = [
  { name: "Ananya", role: "Traveler", feedback: "Trip Planner made my vacation so much easier! I could plan everything in one place." },
  { name: "Rahul", role: "Adventure Enthusiast", feedback: "I loved how smooth the planning process was. Highly recommend this app!" },
  { name: "Sophia", role: "Backpacker", feedback: "Clean UI, easy to use, and perfect for organizing trips with friends!" },
  { name: "David", role: "Solo Explorer", feedback: "Managing my budget on the go was super easy. This app is a must-have!" },
  { name: "Meera", role: "Family Planner", feedback: "Helped me organize a family trip without any stress. Kids loved the experience!" },
  { name: "Alex", role: "Photographer", feedback: "AI recommendations took me to hidden gems I’d never have found otherwise." },
  { name: "Li Wei", role: "Student Traveler", feedback: "Affordable trip planning and amazing suggestions within my budget." },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to Your Trip Planner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Plan amazing trips, track your expenses, and get AI-powered recommendations 
            for your next adventure.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Plan Your Trip
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing destinations and create your perfect itinerary.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Track Expenses
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep track of your travel budget and expenses in real-time.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              AI Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized travel recommendations powered by AI.
            </p>
          </div>
        </div>

        {/* ✅ Scrolling Testimonials */}
        <section className="bg-gray-100 dark:bg-gray-800 py-12 rounded-xl shadow-inner overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            What Our Travelers Say
          </h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll space-x-6">
              {[...testimonials, ...testimonials].map((t, index) => (
                <div
                  key={index}
                  className="min-w-[300px] bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
                >
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "{t.feedback}"
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Login/Signup */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Get Started
          </h2>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl m-2 hover:bg-blue-700">
            Login
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-xl m-2 hover:bg-green-700">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
