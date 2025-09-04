const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const blogsFile = path.join(__dirname, "blogs.json");


app.get("/api/blogs", (req, res) => {
  fs.readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });
    res.json(JSON.parse(data));
  });
});


app.get("/api/blogs/:id", (req, res) => {
  fs.readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });
    const blogs = JSON.parse(data);
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  });
});


app.post("/api/blogs", (req, res) => {
  fs.readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });

    const blogs = JSON.parse(data);
    const newBlog = {
      id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      image: req.body.image || "https://via.placeholder.com/400x200?text=No+Image"
    };

    blogs.push(newBlog);

    fs.writeFile(blogsFile, JSON.stringify(blogs, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving blog" });
      res.status(201).json(newBlog);
    });
  });
});

// Delete blog
app.delete("/api/blogs/:id", (req, res) => {
  fs.readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });
    let blogs = JSON.parse(data);
    const blogId = parseInt(req.params.id);
    const newBlogs = blogs.filter(b => b.id !== blogId);

    if (blogs.length === newBlogs.length) {
      return res.status(404).json({ error: "Blog not found" });
    }

    fs.writeFile(blogsFile, JSON.stringify(newBlogs, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving blogs" });
      res.json({ message: "Blog deleted successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
