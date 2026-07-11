import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export default async function handler(req, res) {
  try {
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: [{ role: 'user', content: 'Hola, respondeme solo "funciona!"' }],
      maxTokens: 50,
      temperature: 0,
    });

    const reader = result.toTextStreamResponse().body.getReader();
    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }

    res.status(200).json({ ok: true, response: text });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, stack: err.stack?.split('\n').slice(0, 5) });
  }
};
