# Deployment Guide - Travel Planner with AI Chatbot

## Problem Statement
The AI chatbot requires a backend server running to function. When only the frontend is deployed, the chatbot fails because there's no server to handle API requests.

## Solution Options

### Option 1: Full-Stack Vercel Deployment (Recommended)

This approach deploys both frontend and backend on Vercel.

#### Steps:

1. **Set up Vercel Environment Variables:**
   ```bash
   # In your Vercel dashboard, add these environment variables:
   GEMINI_API_KEY=your-actual-gemini-api-key
   ```

2. **Deploy to Vercel:**
   ```bash
   # Deploy everything to Vercel
   vercel --prod
   ```

3. **Update Production URL:**
   - After deployment, update `.env.production` with your actual Vercel URL
   - Replace `https://your-app-name.vercel.app` with your real deployment URL

### Option 2: Separate Backend Deployment

Deploy the backend to a separate service like Railway, Render, or Heroku.

#### For Railway:
1. Create a new Railway project
2. Connect your GitHub repository
3. Set `GEMINI_API_KEY` in Railway environment variables
4. Railway will automatically detect and deploy the Node.js server
5. Update `REACT_APP_API_URL` in your frontend environment variables

#### For Render:
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `node src/server.js`
5. Add `GEMINI_API_KEY` environment variable
6. Update `REACT_APP_API_URL` in your frontend

### Option 3: Serverless Functions (Alternative)

Convert the server to Vercel serverless functions:

1. Move `src/server.js` → `api/chat.js`
2. Export as serverless function
3. Update frontend to call `/api/chat` directly

## Development Setup

### For Contributors:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SATVIKsynopsis/trip-planner.git
   cd trip-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create src/.env file
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Run both frontend and backend:**
   ```bash
   # Option A: Run both together
   npm run dev
   
   # Option B: Run separately
   # Terminal 1:
   npm run server
   
   # Terminal 2:
   npm start
   ```

## Environment Variables Explained

- **`GEMINI_API_KEY`**: Your Google Gemini API key (backend)
- **`REACT_APP_API_URL`**: The backend API URL (frontend)
  - Development: `http://localhost:5000`
  - Production: Your deployed backend URL

## Current File Structure
```
trip-planner/
├── src/
│   ├── server.js              # Backend API server
│   ├── pages/Chatbot.jsx      # Frontend chatbot component
│   └── .env                   # Backend environment variables
├── .env.development           # Frontend dev environment
├── .env.production           # Frontend prod environment
├── vercel.json               # Vercel deployment config
└── package.json              # Scripts for running both frontend/backend
```

## For Project Contributors

### If you're using the deployed app:
- ✅ **No setup needed** - Everything works automatically
- ✅ **Chatbot is fully functional** - Backend is deployed and running

### If you're developing locally:
1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/)
2. Add it to `src/.env`: `GEMINI_API_KEY=your-key-here`
3. Run: `npm run dev` to start both frontend and backend
4. Access the app at `http://localhost:3000`

## Troubleshooting

### "Error getting response" in chatbot:
1. **Check if backend is running:** Visit `http://localhost:5000/api/health`
2. **Verify API key:** Ensure `GEMINI_API_KEY` is set correctly
3. **Check network:** Ensure no firewall blocking API calls

### Deployment issues:
1. **Vercel deployment:** Check environment variables are set in Vercel dashboard
2. **API URL mismatch:** Ensure frontend is pointing to correct backend URL
3. **CORS errors:** Backend has CORS enabled for all origins

## Quick Commands

```bash
# Development (both frontend + backend)
npm run dev

# Production build
npm run build

# Backend only
npm run server

# Frontend only  
npm start

# Deploy to Vercel
vercel --prod
```
