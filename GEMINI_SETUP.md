# Gemini AI Setup Instructions

This project now uses Google's Gemini 2.0 Flash model for the AI chatbot functionality.

## Getting Started

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API key" in the left sidebar
4. Click "Create API key in new project" or select an existing project
5. Copy the generated API key

### 2. Configure Environment Variables

1. Open the `.env` file in the `src` folder
2. Replace `your-gemini-api-key-here` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```

### 3. Run the Server

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start

# In a separate terminal, start the backend server
cd src
node server.js
```

### 4. Test the Setup

You can test if the API is working by visiting:
- Health check: `http://localhost:5000/api/health`
- The chatbot should now work with Gemini responses

## Model Features

The Gemini 2.0 Flash model provides:
- Fast response times
- High-quality conversational AI
- Travel-focused responses
- Better context understanding
- Cost-effective API usage

## Troubleshooting

- **API Key Issues**: Make sure your API key is correctly set in the `.env` file
- **Quota Limits**: Gemini has usage limits; check your Google AI Studio dashboard
- **Connection Issues**: Ensure you have an internet connection and the API endpoint is accessible

## API Endpoints

- `GET /api/health` - Check server status
- `POST /api/chat` - Send messages to the AI travel assistant
  ```json
  {
    "message": "Plan a 3-day trip to Paris"
  }
  ```
