// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Sample blogs data (you can also fetch from backend)
//   const blogs = [
//     {
//       id: 1,
//       title: "Top 10 Travel Destinations in 2025 🌍",
//       description:
//         "Discover the most trending destinations to explore this year with tips for budget-friendly trips and hidden gems. This blog covers exotic places like Bali, Iceland, Japan, and more. You'll also find insider hacks for affordable flights and unique stays!",
//       author: "Travel Guru",
//       date: "Sep 5, 2025",
//       tag: "Travel",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
//     },
//     {
//       id: 2,
//       title: "How to Plan a Budget-Friendly Europe Trip 💶",
//       description:
//         "Europe doesn’t have to be expensive! This guide will teach you how to explore iconic destinations like Paris, Rome, and Prague without draining your savings. Learn about budget airlines, hostels, and hidden gems that cost little to nothing.",
//       author: "Nomad Expert",
//       date: "Aug 22, 2025",
//       tag: "Budget",
//       image:
//         "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
//     },
//     {
//       id: 3,
//       title: "AI-Powered Trip Planning 🤖",
//       description:
//         "AI is changing how we travel! With smart recommendations, itinerary generators, and expense trackers, AI ensures every trip is personalized. In this blog, we explore the best AI tools and apps that make your journey smoother and more fun.",
//       author: "AI Traveler",
//       date: "Aug 10, 2025",
//       tag: "AI",
//       image:
//         "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
//     },
//     // add others from your Blogs.jsx...
//   ];

//   const blog = blogs.find((b) => b.id === parseInt(id));

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
//         <h1 className="text-3xl font-bold">Blog Not Found 🚫</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-12 px-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/blogs")}
//           className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
//         >
//           ← Back to Blogs
//         </button>

//         {/* Blog Content */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
//         >
//           <img
//             src={blog.image}
//             alt={blog.title}
//             className="w-full h-80 object-cover"
//           />
//           <div className="p-6">
//             <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
//             <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
//               <span>✍️ {blog.author}</span>
//               <span>{blog.date}</span>
//               <span className="bg-pink-500 text-xs px-3 py-1 rounded-full font-semibold">
//                 #{blog.tag}
//               </span>
//             </div>
//             <p className="text-gray-200 text-lg leading-relaxed">
//               {blog.description}
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;







import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy user for comment ownership - replace with auth logic in real app
const currentUser = "Guest User";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // Fetch Blog
  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(r => r.json())
      .then(setBlog);
    fetch(`http://localhost:5000/api/blogs/${id}/comments`)
      .then(r => r.json())
      .then(setComments);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/blogs/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: currentUser, text: newComment }),
    });
    const saved = await res.json();
    setComments([...comments, saved]);
    setNewComment("");
  };

  // Delete Comment
  const handleDeleteComment = async (cid) => {
    await fetch(`http://localhost:5000/api/blogs/${id}/comments/${cid}`, { method: "DELETE" });
    setComments(comments.filter((c) => c.id !== cid));
  };

  // Edit Comment
  const handleStartEdit = (c) => {
    setEditingComment(c.id);
    setEditingValue(c.text);
  };
  const handleEditSubmit = async (cid) => {
    const res = await fetch(`http://localhost:5000/api/blogs/${id}/comments/${cid}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ text: editingValue }),
    });
    const updated = await res.json();
    setComments(comments.map(c => c.id === cid ? { ...c, text: updated.text } : c));
    setEditingComment(null);
    setEditingValue("");
  };

  // Edit/Delete blog
  const handleBlogDelete = async () => {
    await fetch(`http://localhost:5000/api/blogs/${id}`, { method: "DELETE" });
    navigate("/blogs");
  };

  const [editingBlog, setEditingBlog] = useState(false);
  const [editBlogVals, setEditBlogVals] = useState({ title: "", description: "", image: "" });

  const handleBlogEdit = () => {
    setEditBlogVals({ ...blog });
    setEditingBlog(true);
  };

  const handleEditBlogSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(editBlogVals)
    });
    const updated = await res.json();
    setBlog(updated);
    setEditingBlog(false);
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
        <h1 className="text-3xl font-bold">Blog Not Found 🚫</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blogs")}
          className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          ← Back to Blogs
        </button>
        {/* Edit/Delete Toolbar (dummy auth logic) */}
        <div className="flex gap-2 mb-3">
          <button onClick={handleBlogEdit} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">Edit</button>
          <button onClick={handleBlogDelete} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm">Delete</button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Edit Blog */}
          {editingBlog ? (
            <form onSubmit={handleEditBlogSubmit} className="p-6 flex flex-col gap-3">
              <input
                value={editBlogVals.title}
                required
                className="px-4 py-2 rounded border bg-gray-700 text-white"
                onChange={e => setEditBlogVals(v => ({ ...v, title: e.target.value }))}
              />
              <textarea
                value={editBlogVals.description}
                required
                className="px-4 py-2 rounded border bg-gray-700 text-white"
                onChange={e => setEditBlogVals(v => ({ ...v, description: e.target.value }))}
              />
              <input
                value={editBlogVals.image}
                required
                className="px-4 py-2 rounded border bg-gray-700 text-white"
                onChange={e => setEditBlogVals(v => ({ ...v, image: e.target.value }))}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setEditingBlog(false)} type="button" className="bg-gray-400 dark:bg-gray-600 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">Save</button>
              </div>
            </form>
          ) : (
            <>
              <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover" />
              <div className="p-6">
                <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                  <span>✍️ {blog.author || "Anonymous"}</span>
                  <span>{blog.date}</span>
                  <span className="bg-pink-500 text-xs px-3 py-1 rounded-full font-semibold">
                    #{blog.tag}
                  </span>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">{blog.description}</p>
              </div>
            </>
          )}
        </motion.div>
        {/* Comments */}
        <div className="mt-10 bg-gray-900/70 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>
          <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-4">
            <input
              required
              className="flex-1 px-4 py-2 rounded border bg-gray-700 text-white"
              placeholder="Write a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">Post</button>
          </form>
          <ul className="divide-y divide-gray-700">
            {comments.map(c => (
              <li key={c.id} className="py-2 flex items-start gap-3">
                <span className="font-bold text-blue-400 mr-2">{c.author}</span>
                {editingComment === c.id ? (
                  <form
                    onSubmit={e => {e.preventDefault();handleEditSubmit(c.id);}}
                    className="flex-1 flex gap-2"
                  >
                    <input
                      value={editingValue}
                      required
                      className="flex-1 px-2 py-1 rounded bg-gray-600 text-white"
                      onChange={e => setEditingValue(e.target.value)}
                    />
                    <button className="px-2 py-1 bg-green-500 rounded text-sm">Save</button>
                    <button type="button" className="px-2 py-1 bg-gray-400 rounded text-sm" onClick={() => setEditingComment(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1">{c.text}</span>
                    {c.author === currentUser && (
                      <>
                        <button onClick={() => handleStartEdit(c)} className="ml-1 text-xs text-gray-300">Edit</button>
                        <button onClick={() => handleDeleteComment(c.id)} className="ml-1 text-xs text-red-400">Delete</button>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
