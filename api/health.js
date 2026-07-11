export default async function handler(request) {
  return new Response(JSON.stringify({
    status: 'ok',
    env: {
      groqKeySet: !!process.env.GROQ_API_KEY,
      groqKeyLen: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0,
      nodeEnv: process.env.NODE_ENV || 'not-set',
      vercel: !!process.env.VERCEL,
    },
    method: request.method,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
