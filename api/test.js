const { streamText } = require('ai');
const { createGroq } = require('@ai-sdk/groq');

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || 'no-key',
});

module.exports = async function handler(req, res) {
  try {
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: [{ role: 'user', content: 'Hola' }],
      maxTokens: 50,
      temperature: 0.7,
    });

    const stream = result.toTextStreamResponse().body.getReader();
    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await stream.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }

    res.status(200).json({ ok: true, response: text });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack?.split('\n').slice(0, 5) });
  }
};
