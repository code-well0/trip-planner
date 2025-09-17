import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const [blogs] = useState([
    {
      id: 1,
      title: "Top 10 Travel Destinations in 2025 🌍",
      description:
        "Discover the most trending destinations to explore this year with tips for budget-friendly trips and hidden gems.",
      author: "Travel Guru",
      date: "Sep 5, 2025",
      tag: "Travel",
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
      tag: "Budget",
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
      tag: "AI",
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
      tag: "Solo",
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
      tag: "Food",
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
      tag: "Work",
      image:
        "https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=900&q=80",
    },
  ]);

  // Unique tags
  const tags = ["All", ...new Set(blogs.map((blog) => blog.tag))];

  const filteredBlogs = blogs.filter(
    (blog) =>
      (filter === "All" || blog.tag === filter) &&
      (blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase()) ||
        blog.tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">
          Travel Blogs ✈️
        </h1>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, author, or tag..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                filter === tag
                  ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-black"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-800/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-500/40 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-3 left-3 bg-pink-500 text-xs px-3 py-1 rounded-full font-semibold">
                  #{blog.tag}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-300 text-sm mb-4">
                  {blog.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>✍️ {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                <button
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-semibold hover:opacity-90 transition"
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredBlogs.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No blogs found for “{search}”
          </p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
