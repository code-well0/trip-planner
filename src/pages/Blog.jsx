// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Blog() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/blogs") // backend will serve this
//       .then((res) => res.json())
//       .then((data) => setBlogs(data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">✈️ Travel & Culture Blogs 🌍</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden"
//           >
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="h-48 w-full object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{blog.title}</h2>
//               <p className="text-gray-600">{blog.description}</p>
//               <Link
//                 to={`/blog/${blog.id}`}
//                 className="text-blue-600 hover:underline mt-2 block"
//               >
//                 Read More →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Blog;






import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// For Dark/Light Mode
const getInitialTheme = () =>
  localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", description: "", image: "" });
  const [theme, setTheme] = useState(getInitialTheme());
  const navigate = useNavigate();

  // Fetch blogs
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  // Theme effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Blog Submission Handler
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    // Add POST to backend here (image is url for now)
    // In prod use FormData for actual upload
    const res = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog)
    });
    const savedBlog = await res.json();
    setBlogs([...blogs, savedBlog]);
    setNewBlog({ title: "", description: "", image: "" });
    setShowNew(false);
  };

  // Theme switch
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="p-6 min-h-screen transition-colors bg-gray-100 dark:bg-[#181837]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ✈️ Travel & Culture Blogs 🌍
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Share, discover, and discuss unique journeys.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNew(v => !v)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            + New Post
          </button>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
      {/* New Blog Form */}
      {showNew && (
        <form
          className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4"
          onSubmit={handleBlogSubmit}
        >
          <input
            required
            className="px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Title"
            value={newBlog.title}
            onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <textarea
            required
            className="px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Description"
            value={newBlog.description}
            onChange={e => setNewBlog({ ...newBlog, description: e.target.value })}
          />
          <input
            type="url"
            className="px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Image URL"
            value={newBlog.image}
            onChange={e => setNewBlog({ ...newBlog, image: e.target.value })}
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowNew(false)} className="bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Post</button>
          </div>
        </form>
      )}
      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition hover:ring-4 hover:ring-blue-200 hover:dark:ring-blue-600"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold dark:text-white">{blog.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{blog.description.slice(0, 100)}...</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline mt-2 block"
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
///