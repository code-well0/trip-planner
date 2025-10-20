import React from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "../Components/SplitText";
import FadeContent from "../Components/FadeContent";
import TravelGuides from "./testimonial/Trip-Planer-Guider";

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
                    text="YourTripPlanner 🌍"
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
                {/* <div className="mt-8 space-x-4">
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
                </div> */}
                {/* Animated Plane Icon */}
            </section>

            <div className="container mx-auto px-4 py-8">
                <FadeContent
                    blur={true}
                    duration={1000}
                    easing="ease-out"
                    initialOpacity={0}
                >
                    <h2 className="text-3xl flex items-center justify-center font-bold mb-12 text-gray-800 dark:text-white">
                        Why Choose YourTripPlanner?
                    </h2>

                    {/* Unified Grid for all 6 cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto my-16 items-stretch">
                        {/* Card 1: AI-Powered Itineraries */}
                        <div
                            onClick={() => navigate("/api/chat")}
                            className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
                        >
                            <span className="text-4xl">🗺️</span>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                AI-Powered Itineraries
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Plan trips in seconds with AI assistance.
                            </p>
                        </div>

                        {/* Card 2: Track Expenses */}
                        <div
                            onClick={() => navigate("/expenses")}
                            className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
                        >
                            <span className="text-4xl">💰</span>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                Track Expenses
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Stay on budget while traveling.
                            </p>
                        </div>

         {/* Card 3: Plan Your Trip */}
<div
    onClick={() => navigate("/plan")}
    className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
>
    <span className="text-4xl">🌍</span>
    <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
        Plan Your Trip
    </h3>
    <p className="mt-2 text-gray-600 dark:text-gray-300">
        Discover amazing destinations and create your perfect itinerary.
    </p>
</div>

{/* Card 4: Mood-based Recommendations */}
<div
    onClick={() => navigate("/TripRecommender")}
    className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
>
    <span className="text-4xl">✨</span>
    <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
        Mood-based Recommendations
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
        Get personalized recommendations based on your mood
    </p>
</div>

{/* Card 5: Activity Planner */}
<div
    onClick={() => navigate("/activity-planner")}
    className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
>
    <span className="text-4xl">🗓️</span>
    <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
        Activity Planner
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
        Organize every travel activity, sight, and event into a seamless plan.
    </p>
</div>

{/* Card 6: Explore Travel Blogs */}
<div
    onClick={() => navigate("/blogs")}
    className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
>
    <span className="text-4xl">✍🏻</span>
    <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
        Explore Travel Blogs
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
        Get inspired by curated travel blogs.
    </p>
</div>

          </div>
          <div className="text-center mt-12 mb-20">
            <button 
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Start Planning
            </button>
          </div>
        </FadeContent>
                        {/* Card 3: Plan Your Trip */}
                        <div
                            onClick={() => navigate("/plan")}
                            className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
                        >
                            <span className="text-4xl">🌍</span>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                Plan Your Trip
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Discover amazing destinations and create your perfect itinerary.
                            </p>
                        </div>

                        {/* Card 4: Mood-based Recommendations (FIXED) */}
                        <div
                            onClick={() => navigate("/TripRecommender")}
                            className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
                        >
                            <span className="text-4xl">✨</span>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                Mood-based Recommendations
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get personalized recommendations based on your mood
                            </p>
                        </div>

                        {/* Card 5: Activity Planner (FIXED) */}
                        <div
                            onClick={() => navigate("/activity-planner")}
                            className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
                        >
                            <span className="text-4xl">🗓️</span>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                Activity Planner
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Organize every travel activity, sight, and event into a seamless plan.
                            </p>
                        </div>

                        {/* Card 6: Explore Travel Blogs (FIXED) */}
                        <div
                            onClick={() => navigate("/blogs")}
                            className="cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:scale-105 transform transition flex flex-col h-full"
                        >
                            <span className="text-4xl">✍🏻</span>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                Explore Travel Blogs
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get inspired by curated travel blogs.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-12 mb-20">
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
                        >
                            Start Planning
                        </button>
                    </div>
                </FadeContent>

                {/* ✅ Testimonials */}
                <TravelGuides />
            </div>
        </div>
    );
};

export default Home;