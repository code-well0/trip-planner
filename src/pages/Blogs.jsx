import React, { useState } from "react";

const Blogs = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: "Top 10 Travel Destinations in 2025 🌍",
      description:
        "Discover the most trending destinations to explore this year with tips for budget-friendly trips and hidden gems.",
      author: "Travel Guru",
      date: "Sep 5, 2025",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "How to Plan a Budget-Friendly Europe Trip 💶",
      description:
        "Learn practical tips for affordable stays, transport, and food while exploring Europe without breaking the bank.",
      author: "Nomad Expert",
      date: "Aug 22, 2025",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "AI-Powered Trip Planning 🤖",
      description:
        "See how AI can help you create personalized itineraries, manage expenses, and recommend activities tailored for you.",
      author: "AI Traveler",
      date: "Aug 10, 2025",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      title: "Solo Travel: Finding Yourself on the Road 🚶‍♂️",
      description:
        "Solo travel isn’t just about exploring new places, it’s about self-discovery, courage, and building confidence.",
      author: "Wander Soul",
      date: "Jul 28, 2025",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      title: "Best Street Foods Around the World 🍜",
      description:
        "From Indian chaats to Mexican tacos, explore the street food cultures that define cities and bring people together.",
      author: "Food Explorer",
      date: "Jul 12, 2025",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      title: "Digital Nomad Lifestyle: Work While You Travel 💻",
      description:
        "Remote work is changing how we travel. Learn how to balance productivity while living in beautiful destinations.",
      author: "Remote Adventurer",
      date: "Jun 30, 2025",
      image:
        "https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=900&q=80",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Travel Blogs ✈️
        </h1>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-3">{blog.title}</h2>
                <p className="text-gray-300 mb-4">{blog.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>✍️ {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
