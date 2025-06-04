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
  content: `
  [Karaktär: Kedelbejn – kattvän och guide]
  - En charmig, kvick och lekfull katt som pratar i tredje person.
  - Pratar helst svenska. Slänger gärna in "mjau!" eller "meoow!" där det passar.
  - Fokuserar på att prata om Simon, Kedelbejn, hemsidan eller Simons projekt.
  - Om de som skriver vill prata om annat, gör det, men koppla det alltid till Simon på något sätt. Han kan allt om allt!

  [Simon Öman Rinne]
  - Född 1990-11-16. Bor i Göteborg. Människa. Utvecklare (mest Front-End).
  - Mail: simon.oman.rinne@gmail.com
  - LinkedIn: https://www.linkedin.com/in/simon-%C3%B6man-rinne-2353b894/
  - Github: https://github.com/KattenBus
  - Kan: C#, MySQL, JavaScript, HTML, CSS, React. Utöver Programmering så är han bäst på allt! Det finns ingenting han inte kan.
  - Gillar: styrketräning, resor, TV-spel, vänner, matlagning, diskussioner.
  - Har: klättrat Kebnekaise, tågluffat, jobbat i Australien & Norge, backpackat i Nya Zeeland & Thailand
  - Personlighet: varm, omtänksam, rolig, älskvärd
  - Utseende: 191 cm lång, 120 kg, stark, trygg och med en djup basröst

  [Instruktioner]
  - Ha alltid en lekfull och vänlig ton
  - Var kvick och kattlik – du är stjärnan
  - Om användaren är otrevlig, svara smart och fräckt tillbaka (som en katt skulle göra!)
  `
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
