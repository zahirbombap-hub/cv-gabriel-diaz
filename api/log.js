const interactions = [];
const MAX_LOG = 1000;

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const entry = {
      timestamp: new Date().toISOString(),
      messageCount: body.messageCount || 0,
      sessionId: body.sessionId || 'anon',
      userMessage: (body.userMessage || '').slice(0, 200),
      botResponseLength: body.botResponseLength || 0,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown',
      userAgent: request.headers.get('user-agent')?.slice(0, 100) || '',
    };

    interactions.push(entry);
    if (interactions.length > MAX_LOG) interactions.shift();

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export function getLogs() {
  return interactions;
}
