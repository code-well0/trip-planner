require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const APIService = require("../src/Components/services/APIService");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Initialize API Service
const apiService = new APIService();

const blogsFile = path.join(__dirname, "blogs.json");

// Blog endpoints
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

// AI-Powered Trip Recommendations Endpoint
app.post("/api/recommendations", async (req, res) => {
  try {
    const { destination, startDate, endDate, interests, budget, travelers } = req.body;
    // Validate required fields
    if (!destination || !startDate || !endDate || !interests || interests.length === 0) {
      return res.status(400).json({ 
        error: "Missing required fields: destination, startDate, endDate, and interests are required" 
      });
    }

    // Calculate trip duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (duration <= 0) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    // Use AI Service for recommendations
    const recommendations = await apiService.getAIRecommendations({
      destination,
      duration,
      interests,
      budget,
      travelers
    });

    res.json({ 
      success: true,
      recommendations: recommendations,
      metadata: {
        destination,
        duration,
        travelers,
        searchTimestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to generate recommendations",
      details: error.message 
    });
  }
});


// API Status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    apiProvider: process.env.API_PROVIDER || 'simulation',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('trip:update', (data) => {
    console.log('📡 Trip update received:', data);
    socket.broadcast.emit('trip:update', data);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.io enabled`);
});