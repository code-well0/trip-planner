
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const port = 5000;


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "use your own open ai api key"
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', 
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});



app.listen(port, () => console.log(`Server running on port ${port}`));
