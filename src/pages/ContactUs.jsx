import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin, Github } from "lucide-react";

export default function Contact() {
  // Add this hook to set the page title
  useEffect(() => {
    document.title = 'Contact Us | Your Trip Planner';
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-white flex items-center justify-center p-6 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left Section */}
        <motion.div
          className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 p-8 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Your Journey Starts Here</h2>
          <p className="mb-6 text-gray-800 dark:text-gray-100">
            Need help planning your next adventure? Whether it’s a family trip, solo
            backpacking, or business tour — we’ve got you covered.
          </p>

          {/* Quick Highlights */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-white/30 dark:bg-black/30 rounded-lg p-3">
              ✈️ <p className="text-sm mt-1">Flights</p>
            </div>
            <div className="bg-white/30 dark:bg-black/30 rounded-lg p-3">
              🏨 <p className="text-sm mt-1">Stays</p>
            </div>
            <div className="bg-white/30 dark:bg-black/30 rounded-lg p-3">
              🗺️ <p className="text-sm mt-1">Tours</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/30 dark:bg-black/30 p-3 rounded-lg">
              <Mail /> <span>tripplanner@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 bg-white/30 dark:bg-black/30 p-3 rounded-lg">
              <Phone /> <span>+91 9876543210</span>
            </div>
            <div className="flex items-center gap-3 bg-white/30 dark:bg-black/30 p-3 rounded-lg">
              <MapPin /> <span>India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Follow our journey</h3>
            <div className="flex gap-6 text-2xl">
              <a
                href="https://www.instagram.com/_shubrali/"
                className="hover:text-pink-400"
              >
                <Instagram />
              </a>
              <a
                href="https://www.linkedin.com/in/shubrali-jain/"
                className="hover:text-blue-500"
              >
                <Linkedin />
              </a>
              <a
                href="mailto:shubralijain@gmail.com"
                className="hover:text-pink-400"
              >
                <Mail />
              </a>
              <a
                href="https://github.com/code-well0"
                aria-label="GitHub Profile"
                className="hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Github />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors duration-300"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}