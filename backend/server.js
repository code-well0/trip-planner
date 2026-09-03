import dotenv from 'dotenv';
dotenv.config();
import express, { json } from "express";
import { readFile, writeFile } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { createServer } from "http";
import { getAIRecommendations } from './services/APIService.js';
import { getLivePriceEstimate } from './services/priceService.js';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Database connection
const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trip-planner');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize database
(async () => {
  await mongodb();
})();

const blogsFile = join(__dirname, "blogs.json");

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Travel Assistant API is running',
    model: 'gemini-2.5-flash',
    timestamp: new Date().toISOString(),
  });
});

// API Status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    apiProvider: process.env.API_PROVIDER || 'simulation',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const travelPrompt = `You are an AI Travel Assistant for a trip planning application. Provide helpful, accurate, and engaging travel in short only. User question: ${message}`;
    const result = await model.generateContent(travelPrompt);
    const reply = await result.response.text();

    if (!reply || reply.trim().length === 0) throw new Error('Empty response from Gemini');

    res.json({ reply: reply.trim() });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'AI service failed: ' + error.message });
  }
});

// AI recommendations endpoint
app.post('/api/ai', async (req, res) => {
  try {
    const { destination, interests, budget, travelers, duration } = req.body;
    if (!destination || !interests) return res.status(400).json({ error: 'Destination and interests are required.' });

    const recommendations = await getAIRecommendations({ destination, interests, budget, travelers, duration });
    res.json({ recommendations });
  } catch (err) {
    console.error('AIService Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Live price estimate endpoint (real-time flight pricing for 2 travelers)
app.post('/api/price-estimate', async (req, res) => {
  try {
    const { destination, origin } = req.body;
    if (!destination) return res.status(400).json({ error: 'Destination is required.' });

    const estimate = await getLivePriceEstimate({
      destinationCity: destination,
      originCity: origin || 'Delhi',
      travelers: 2,
    });
    res.json(estimate);
  } catch (err) {
    console.error('Price estimate error:', err.message);
    res.status(502).json({ error: err.message, source: 'unavailable' });
  }
});

// Blog endpoints
app.get("/api/blogs", (req, res) => {
  readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });
    res.json(JSON.parse(data));
  });
});

app.get("/api/blogs/:id", (req, res) => {
  readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });
    const blogs = JSON.parse(data);
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  });
});

app.post("/api/blogs", (req, res) => {
  readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });

    const blogs = JSON.parse(data);
    const newBlog = {
      id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      image: req.body.image || "https://via.placeholder.com/400x200?text=No+Image",
      createdAt: new Date().toISOString()
    };

    blogs.push(newBlog);

    writeFile(blogsFile, JSON.stringify(blogs, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving blog" });
      res.status(201).json(newBlog);
    });
  });
});

app.delete("/api/blogs/:id", (req, res) => {
  readFile(blogsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading blogs" });
    let blogs = JSON.parse(data);
    const blogId = parseInt(req.params.id);
    const newBlogs = blogs.filter(b => b.id !== blogId);

    if (blogs.length === newBlogs.length) {
      return res.status(404).json({ error: "Blog not found" });
    }

    writeFile(blogsFile, JSON.stringify(newBlogs, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving blogs" });
      res.json({ message: "Blog deleted successfully" });
    });
  });
});

// io.on('connection', (socket) => {
//   console.log('🔌 Client connected:', socket.id);
  
//   socket.on('trip:update', (data) => {
//     console.log('📡 Trip update received:', data);
//     socket.broadcast.emit('trip:update', data);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('🔌 Client disconnected:', socket.id);
//   });
// });

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  // console.log(`🔌 Socket.io enabled`);
  console.log(`🤖 AI Model: gemini-2.5-flash`);
  console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});