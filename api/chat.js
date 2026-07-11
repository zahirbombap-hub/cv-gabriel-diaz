import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { SYSTEM_PROMPT } from './prompt.js';
import { sanitizeInput, isInjection, isFlood, validateMessages } from './sanitize.js';
import { checkRateLimit } from './rateLimit.js';

export const config = {
  runtime: 'edge',
};

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (rateLimit) {
    return new Response(JSON.stringify({ error: rateLimit.reason }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = body;

  if (!validateMessages(messages)) {
    return new Response(JSON.stringify({ error: 'Mensajes inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lastMessage = messages[messages.length - 1];
  const cleaned = sanitizeInput(lastMessage.content);

  if (isInjection(cleaned)) {
    return new Response(
      JSON.stringify({ error: 'Mensaje no permitido. Por favor escribe algo apropiado.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (isFlood(cleaned)) {
    return new Response(
      JSON.stringify({ error: 'Mensaje detectado como repetitivo. Por favor escribe algo más elaborado.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
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

    return result.toDataStreamResponse();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno: ' + err.message, stack: err.stack?.split('\n').slice(0, 5).join('\n') }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
