import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Blog deleted successfully");
          navigate("/blog"); // go back to listing
        } else {
          alert("Failed to delete blog");
        }
      } catch (err) {
        alert("Error deleting blog");
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center p-6">
        <p className="text-white text-lg">{error}</p>
        <Link
          to="/blog"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 text-gray-800">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-60 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-3xl font-bold text-blue-700 mb-3">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-6">✍ {blog.author}</p>
        <p className="text-lg leading-relaxed text-gray-800">{blog.content}</p>

        <div className="flex justify-between items-center mt-6">
          <Link
            to="/blog"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Blogs
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑 Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
