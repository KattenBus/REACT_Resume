import express from 'express';
import OpenAI from 'openai';  // Importing the OpenAI class
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create an OpenAI instance with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  apiBase: 'https://api.openai.com/v1',  // Optional: You can specify the base URL if needed
});

app.post('/api/ask-bot', async (req, res) => {
  const userQuestion = req.body.question;
  try {
    // Use the chat completions endpoint
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // You can use 'gpt-4' or other models
      messages: [{ role: 'user', content: userQuestion }],
    });

    // Send the response from OpenAI
    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
