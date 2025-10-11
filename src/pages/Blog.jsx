import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  // Add this hook to set the page title
  useEffect(() => {
    document.title = 'Blog | Your Trip Planner';
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs") // backend will serve this
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">✈️ Travel & Culture Blogs 🌍</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.description}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-600 hover:underline mt-2 block"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;