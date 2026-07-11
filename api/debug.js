export default async function handler(request) {
  const info = {
    env: {
      GROQ_API_KEY_SET: !!process.env.GROQ_API_KEY,
      GROQ_API_KEY_LENGTH: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0,
      NODE_ENV: process.env.NODE_ENV,
    },
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
  };

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      info.body = body;
    } catch {}
  }

  return new Response(JSON.stringify(info, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
