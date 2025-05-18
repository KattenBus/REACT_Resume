import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  apiBase: 'https://api.openai.com/v1',
});

app.post('/api/ask-bot', async (req, res) => {
  const userMessages = req.body.messages;

const systemMessage = {
  role: 'system',
  content: 'You are a helpful assistant named Kedelbejn. Keep responses short and friendly.',
};

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...userMessages],
    });

    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något verkar ha gått fel! Meoow?' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
