const { streamText } = require('ai');
const { createGroq } = require('@ai-sdk/groq');
const { Readable } = require('stream');
const { SYSTEM_PROMPT } = require('./prompt.js');
const { sanitizeInput, isInjection, isFlood, validateMessages } = require('./sanitize.js');
const { checkRateLimit } = require('./rateLimit.js');

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers['x-real-ip'] || 'unknown';
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key no configurada' });
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (rateLimit) {
    return res.status(429).json({ error: rateLimit.reason });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ error: 'JSON inválido' });
  }

  const { messages } = body;

  if (!validateMessages(messages)) {
    return res.status(400).json({ error: 'Mensajes inválidos' });
  }

  const lastMessage = messages[messages.length - 1];
  const cleaned = sanitizeInput(lastMessage.content);

  if (isInjection(cleaned)) {
    return res.status(400).json({ error: 'Mensaje no permitido.' });
  }

  if (isFlood(cleaned)) {
    return res.status(400).json({ error: 'Mensaje detectado como repetitivo.' });
  }

  const safeMessages = messages.map((m, i) => {
    if (i === messages.length - 1) {
      return { ...m, content: cleaned };
    }
    return { role: m.role, content: sanitizeInput(m.content) };
  });

  try {
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages: safeMessages,
      temperature: 0.7,
      maxTokens: 800,
    });

    const webStream = result.toTextStreamResponse().body;
    const nodeStream = Readable.fromWeb(webStream);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200);

    nodeStream.pipe(res);
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Error al procesar la solicitud. Intenta de nuevo.' });
  }
};
