import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author, image })
    });
    navigate("/blog");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-blue-50 rounded-xl shadow-md space-y-6 border border-blue-200">
  <h2 className="text-2xl font-bold text-blue-700">Add New Blog</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      required
    />
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      required
    />
    <input
      type="text"
      placeholder="Author"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      required
    />
    <input
      type="text"
      placeholder="Image URL (optional)"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
    />
    <button
      type="submit"
      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Add Blog
    </button>
  </form>
</div>

  );
}

export default AddBlog;
