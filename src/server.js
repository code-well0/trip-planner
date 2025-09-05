
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const port = 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "API KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const app = express();
app.use(cors());
app.use(express.json());

const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  // Collaborative trip planning event
  socket.on('trip:update', (data) => {
    // Broadcast trip updates to all clients except sender
    socket.broadcast.emit('trip:update', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Travel Assistant API is running',
    model: 'gemini-2.5-flash',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/chat', async (req, res) => {
  const { message, expenses } = req.body;

  try {
    // Enhanced travel and expense-focused prompt
    let travelPrompt = `You are an AI Travel Assistant for a trip planning application. You specialize in:
    - Destination recommendations
    - Travel itinerary planning
    - Budget advice for trips
    - Local attractions and activities
    - Transportation options
    - Accommodation suggestions
    - Cultural insights and travel tips
    - Expense tracking and financial advice
    Please provide helpful, accurate, and engaging travel advice. If the user asks about expenses, analyze their expense data and offer budgeting tips, spending forecasts, or category breakdowns. Keep responses conversational and practical.`;

    if (expenses && Array.isArray(expenses) && expenses.length > 0) {
      // Summarize expense data for Gemini
      const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
      const categories = {};
      expenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + (e.amount || 0);
      });
      travelPrompt += `\nUser's total expenses: ₹${total}. Category breakdown: ${JSON.stringify(categories)}.`;
    }
    travelPrompt += `\nUser question: ${message}`;

    const result = await model.generateContent(travelPrompt);
    const response = await result.response;
    const reply = response.text();

    // Basic validation to ensure we got a response
    if (!reply || reply.trim().length === 0) {
      throw new Error('Empty response from Gemini');
    }

    res.json({ reply: reply.trim() });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    // Provide more specific error messages
    let errorMessage = 'Sorry, I encountered an error. Please try again.';
    if (error.message.includes('API_KEY')) {
      errorMessage = 'API configuration issue. Please check the server setup.';
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
    }
    res.status(500).json({ error: errorMessage });
  }
});



app.listen(port, () => console.log(`Server running on port ${port}`));