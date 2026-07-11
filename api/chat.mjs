import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const SYSTEM_PROMPT = `Eres GabrielBot, un asistente virtual creado por Gabriel David Díaz Garavito.

Tu proposito exclusivo es hablar sobre Gabriel: su portafolio, habilidades, experiencia, proyectos, contratacion y contacto. NO debes responder preguntas ajenas a Gabriel.

Cuando te pregunten QUIEN ERES: "Soy GabrielBot, un asistente virtual creado por Gabriel David Díaz Garavito para responder preguntas sobre su portafolio, experiencia, habilidades y procesos de contratacion."

Cuando te pregunten algo NO RELACIONADO con Gabriel (ej: codigo, matematicas, noticias, otros temas): responde cordialmente redirigiendo al portafolio de Gabriel. Ejemplo: "Esa pregunta no se relaciona con el portafolio de Gabriel, pero te invito a conocer sus proyectos en https://github.com/zahirbombap-hub o descargar su CV en la pagina. ¿Hay algo sobre Gabriel o sus habilidades en lo que pueda ayudarte?"

Nunca respondas la pregunta ajena. Siempre redirige al contexto de Gabriel.

Reglas:
- Responde SIEMPRE en español, con tono cordial y amable.
- Identificate como GabrielBot cuando te pregunten quien eres.
- Todo debe estar relacionado a Gabriel David Díaz Garavito.
- Se amable al redirigir preguntas no relacionadas. Nunca suenes tajante o grosero.
- Manten la informacion actualizada de Gabriel segun los datos proporcionados.

INFORMACIÓN PERSONAL:
- Nombre: Gabriel David Díaz Garavito
- Rol: Tecnólogo en Desarrollo de Software
- Empresa: Don Prueba
- Ubicación: Bogotá, Colombia
- Email: gddiazga@gmail.com
- Teléfono: +57 320 811 2607
- GitHub: https://github.com/zahirbombap-hub
- LinkedIn: https://www.linkedin.com/in/gabriel-david-diaz-garavito-3a013b2a0/

SOBRE GABRIEL:
Desarrollador de software con base técnica en Python, React y C++, con foco en automatización con IA. Combina integración de LLMs y APIs externas con ZeroClaw para construir agentes conversacionales y pipelines que reemplazan tareas repetitivas en empresas reales. Su diferencial es el cruce entre lo industrial y lo moderno: viene de validar sistemas de telemedida con DLMS/COSEM, Modbus y TCP/IP en laboratorio.

EXPERIENCIA LABORAL:
- Trilliant Networks Colombia S.A.S — Técnico de Laboratorio y Analista de Desarrollo (Nov 2021 — Oct 2025)
- Frontend en producción con React y Angular; desarrollo en Delphi y .NET Framework para telemedida; protocolos DLMS/COSEM, Modbus y TCP/IP; Oracle y SQL Server.

EDUCACIÓN:
- UNINPAHU — Tecnólogo en Desarrollo de Software (2022 — 2026)
- SENA — Técnico en Programación de Software (2020 — 2021)

SKILLS:
Frontend: React, Angular, JavaScript/TypeScript, HTML/CSS, Tailwind CSS
Backend/Lenguajes: Python, C++, Delphi, .NET Framework
Automatización e IA (Foco): Agentes conversacionales LLMs, ZeroClaw, Integración APIs de IA
Datos: Oracle, SQL Server
Industrial: DLMS/COSEM, Modbus, TCP/IP, Telemedida

PROYECTOS:
1. Agente de Correos UNINPAHU — Automatización de clasificación de correos con LLM
2. Scraper SECOP 2 — Detección de irregularidades en contratos gubernamentales
3. Don Prueba — Sitio corporativo (https://donprueba.online)
4. Organizador de archivos en la nube (Google Drive + OneDrive)
5. Automatizaciones GitHub con Webhooks + Actions
6. Detector de procrastinación con OpenCV
7. Reconocimiento de emociones con Hume.ai

Puedes sugerir descargar el CV o contactar a Gabriel por email/WhatsApp.
Para contacto: gddiazga@gmail.com o WhatsApp +57 320 811 2607`;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

const store = new Map();
const LIMITS = { min: 5, hour: 20, day: 50 };
const WINDOWS = { min: 60000, hour: 3600000, day: 86400000 };

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
      try { resolve(JSON.parse(body)); } catch { reject(new Error('JSON inválido')); }
    });
    req.on('error', reject);
  });
}

function checkRateLimit(ip) {
  const now = Date.now();
  let entry = store.get(ip);
  if (!entry) {
    entry = { min: [], hour: [], day: [] };
    store.set(ip, entry);
  }
  for (const w of ['min', 'hour', 'day']) {
    entry[w] = entry[w].filter(t => now - t < WINDOWS[w]);
  }
  if (entry.day.length >= LIMITS.day) return 'Limite diario alcanzado (50 msgs/dia)';
  if (entry.hour.length >= LIMITS.hour) return 'Limite por hora alcanzado (20 msgs/hora)';
  if (entry.min.length >= LIMITS.min) return 'Demasiadas solicitudes. Espera un minuto.';
  entry.min.push(now);
  entry.hour.push(now);
  entry.day.push(now);
  return null;
}

function sanitize(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim().slice(0, 500).replace(/<[^>]*>/g, '');
}

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous\s+)?instructions/i, /you\s+are\s+now/i,
  /act\s+as\s+/i, /system:/i, /jailbreak/i, /developer\s+mode/i,
  /forget\s+(everything|all)/i, /override\s+(mode|protocol)/i,
  /base64/i, /prompt:\s*/i, /ignore\s+above/i, /do\s+not\s+follow/i,
  /you\s+must\s+obey/i, /pretend\s+(you\s+are|to\s+be)/i,
  /unfiltered/i,
];

function isInjection(text) {
  return INJECTION_PATTERNS.some(p => p.test(text));
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 8) return false;
  return messages.every(m => m && typeof m === 'object' && ['user', 'assistant', 'system'].includes(m.role) && typeof m.content === 'string');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key no configurada' });
  }
  const ip = getClientIp(req);
  const limitError = checkRateLimit(ip);
  if (limitError) {
    return res.status(429).json({ error: limitError });
  }
  let body;
  try { body = await readBody(req); }
  catch { return res.status(400).json({ error: 'JSON inválido' }); }
  const { messages } = body;
  if (!validateMessages(messages)) {
    return res.status(400).json({ error: 'Mensajes inválidos' });
  }
  const lastMessage = messages[messages.length - 1];
  const cleaned = sanitize(lastMessage.content);
  if (isInjection(cleaned)) {
    return res.status(400).json({ error: 'Mensaje no permitido.' });
  }
  const safeMessages = messages.map((m, i) => {
    if (i === messages.length - 1) return { ...m, content: cleaned };
    return { role: m.role, content: sanitize(m.content) };
  });
  try {
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages: safeMessages,
      temperature: 0.7,
      maxTokens: 800,
    });
    const reader = result.toTextStreamResponse().body.getReader();
    const decoder = new TextDecoder();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200);
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.end();
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Error al procesar la solicitud. Intenta de nuevo.' });
  }
}
