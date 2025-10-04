import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample blogs data (you can also fetch from backend)
  const blogs = [
    {
      id: 1,
      title: "Top 10 Travel Destinations in 2025 🌍",
      description:
        "Discover the most trending destinations to explore this year with tips for budget-friendly trips and hidden gems. This blog covers exotic places like Bali, Iceland, Japan, and more. You'll also find insider hacks for affordable flights and unique stays!",
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
        "Europe doesn’t have to be expensive! This guide will teach you how to explore iconic destinations like Paris, Rome, and Prague without draining your savings. Learn about budget airlines, hostels, and hidden gems that cost little to nothing.",
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
        "AI is changing how we travel! With smart recommendations, itinerary generators, and expense trackers, AI ensures every trip is personalized. In this blog, we explore the best AI tools and apps that make your journey smoother and more fun.",
      author: "AI Traveler",
      date: "Aug 10, 2025",
      tag: "AI",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    },
    // add others from your Blogs.jsx...
  ];

  const blog = blogs.find((b) => b.id === parseInt(id));

  // Add this dynamic hook to set the page title
  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Your Trip Planner`;
    } else {
      document.title = 'Blog Not Found | Your Trip Planner';
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
        <h1 className="text-3xl font-bold">Blog Not Found 🚫</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blogs")}
          className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          ← Back to Blogs
        </button>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
              <span>✍️ {blog.author}</span>
              <span>{blog.date}</span>
              <span className="bg-pink-500 text-xs px-3 py-1 rounded-full font-semibold">
                #{blog.tag}
              </span>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed">
              {blog.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetails;