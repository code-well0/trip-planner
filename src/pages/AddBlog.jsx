import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This is the new hook to set the page title
  useEffect(() => {
    document.title = 'Add Blog | Your Trip Planner';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) return;

    setLoading(true);
    await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author, image }),
    });

    setLoading(false);
    setTitle("");
    setContent("");
    setAuthor("");
    setImage("");
    navigate("/blog");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">
          ✍️ Add New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          {/* Content */}
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          {/* Author */}
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          {/* Image URL */}
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Image Preview */}
          {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl border border-gray-700"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-black transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-yellow-400 hover:opacity-90"
            }`}
          >
            {loading ? "Adding Blog..." : "🚀 Add Blog"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddBlog;