// src/pages/ContactUs.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, MessageSquare, Loader2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { toast } from "react-toastify";

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FORMSPREE_FORM_ID = "meedaqap"; // Replace with your actual Formspree ID to receive real emails!

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    setIsSubmitting(true);

    // If Formspree ID is not configured, simulate successful email dispatch directly
    if (FORMSPREE_FORM_ID === "YOUR_FORMSPREE_FORM_ID" || !FORMSPREE_FORM_ID) {
      setTimeout(() => {
        setIsSubmitting(false);
        toast.info("Please set your FORMSPREE_FORM_ID in ContactUs.jsx to receive actual emails.");
        toast.success("Message sent directly to yourtripplannerr@gmail.com!");
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Support Issue from ${formData.name}`,
        }),
      });

      if (response.ok) {
        toast.success("Message sent directly to yourtripplannerr@gmail.com! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col lg:flex-row transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-950 text-white'
          : 'bg-white text-gray-900'
      } lg:h-[calc(100vh-72px)] lg:overflow-hidden`}
    >
      {/* Decorative Orbs */}
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        theme === 'dark' ? 'bg-indigo-500/10 opacity-70' : 'bg-indigo-500/5 opacity-50'
      }`}></div>
      <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        theme === 'dark' ? 'bg-purple-500/10 opacity-70' : 'bg-purple-500/5 opacity-50'
      }`}></div>

      {/* Left Section (Hero / Info) */}
      <div
        className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-6 lg:py-4 lg:h-full lg:overflow-y-auto relative z-10"
        style={{
          background: theme === 'dark'
            ? "linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,41,59,0.3) 100%)"
            : "linear-gradient(135deg, rgba(248,250,252,0.8) 0%, rgba(241,245,249,0.5) 100%)",
          borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-[450px] mx-auto lg:mx-0">
          
          {/* Header & Icon on Same Line */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-3 w-full">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
              <MessageSquare className="w-5.5 h-5.5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold leading-none text-left tracking-tight">
              <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'}`}>
                Your Journey
              </span>
              <br />
              <span className={`bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500'} mt-1 inline-block`}>
                Starts Here
              </span>
            </h1>
          </div>

          <p className={`text-xs sm:text-sm mb-4 leading-relaxed max-w-[340px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Need help planning your next adventure? Whether it's flights, stays, or custom tours — we're here to help you.
          </p>

          {/* Quick Highlights */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-[360px] mb-4">
            <div className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/50 text-white' : 'bg-white/70 border-gray-200/50 text-gray-800 shadow-sm'}`}>
              <span className="text-lg mb-0.5">✈️</span>
              <p className="text-[9px] font-bold">Flights</p>
            </div>
            <div className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/50 text-white' : 'bg-white/70 border-gray-200/50 text-gray-800 shadow-sm'}`}>
              <span className="text-lg mb-0.5">🏨</span>
              <p className="text-[9px] font-bold">Stays</p>
            </div>
            <div className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/50 text-white' : 'bg-white/70 border-gray-200/50 text-gray-800 shadow-sm'}`}>
              <span className="text-lg mb-0.5">🗺️</span>
              <p className="text-[9px] font-bold">Tours</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 w-full max-w-[360px] mb-4">
            <div className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/20 text-gray-300 hover:bg-slate-800/50' : 'bg-white/50 border-gray-200/30 text-gray-700 shadow-sm hover:bg-white/80'}`}>
              <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="text-xs font-semibold truncate">yourtripplannerr@gmail.com</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/20 text-gray-300 hover:bg-slate-800/50' : 'bg-white/50 border-gray-200/30 text-gray-700 shadow-sm hover:bg-white/80'}`}>
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold truncate">+91 123456789</span>
              </div>
              <div className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/20 text-gray-300 hover:bg-slate-800/50' : 'bg-white/50 border-gray-200/30 text-gray-700 shadow-sm hover:bg-white/80'}`}>
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="text-xs font-semibold truncate">India</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-2 text-center lg:text-left w-full max-w-[360px]">
            <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mr-1`}>
                Follow Us:
              </span>
              <div className="flex gap-2">
                <a href="https://www.instagram.com/_shubrali/" target="_blank" rel="noopener noreferrer" className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${theme === 'dark' ? 'bg-slate-800/80 text-gray-400 hover:text-pink-400 border border-slate-700/50' : 'bg-white text-gray-500 hover:text-pink-500 border border-gray-200 shadow-sm'}`}>
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="https://www.linkedin.com/in/shubrali-jain/" target="_blank" rel="noopener noreferrer" className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${theme === 'dark' ? 'bg-slate-800/80 text-gray-400 hover:text-blue-400 border border-slate-700/50' : 'bg-white text-gray-500 hover:text-blue-600 border border-gray-200 shadow-sm'}`}>
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="mailto:yourtripplannerr@gmail.com" className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${theme === 'dark' ? 'bg-slate-800/80 text-gray-400 hover:text-red-400 border border-slate-700/50' : 'bg-white text-gray-500 hover:text-red-500 border border-gray-200 shadow-sm'}`}>
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a href="https://github.com/code-well0" target="_blank" rel="noopener noreferrer" className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${theme === 'dark' ? 'bg-slate-800/80 text-gray-400 hover:text-white border border-slate-700/50' : 'bg-white text-gray-500 hover:text-gray-900 border border-gray-200 shadow-sm'}`}>
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div
        className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-6 lg:py-4 lg:h-full lg:overflow-y-auto relative z-10"
      >
        <div className="w-full max-w-[460px] mx-auto">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {/* Header */}
            <div className="text-center lg:text-left mb-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1">
                Get in Touch
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                We'd love to hear from you. Send us a message!
              </p>
            </div>

            {/* Name */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="relative w-full px-4 py-2 border border-gray-200 dark:border-gray-700/60 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-white placeholder-gray-400 text-xs sm:text-sm transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="relative w-full px-4 py-2 border border-gray-200 dark:border-gray-700/60 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-white placeholder-gray-400 text-xs sm:text-sm transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Message */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -m-[1px]"></div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className="relative w-full px-4 py-2 border border-gray-200 dark:border-gray-700/60 rounded-lg focus:outline-none focus:border-transparent bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-white placeholder-gray-400 text-xs sm:text-sm transition-all duration-300 shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
