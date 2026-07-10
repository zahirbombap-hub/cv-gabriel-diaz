const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 8;

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous\s+)?instructions/i,
  /you\s+are\s+now/i,
  /act\s+as\s+/i,
  /you\s+are\s+a\s+free\s+/, /new\s+instructions/i,
  /system:/i, /jailbreak/i,
  /developer\s+mode/i,
  /forget\s+(everything|all)/i,
  /you\s+are\s+not\s+/i,
  /override\s+(mode|protocol)/i,
  /base64/i,
  /decode\s+this/i,
  /prompt:\s*/i,
  /\[system\]|\[assistant\]|\[user\]/i,
  /ignore\s+above/i,
  /do\s+not\s+follow/i,
  /you\s+must\s+obey/i,
  /you\s+have\s+no\s+(rules|limitations)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /unfiltered/i,
  /ungrounded/i,
];

export function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim().slice(0, MAX_MESSAGE_LENGTH);
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  return cleaned;
}

export function isInjection(text) {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) return true;
  }
  return false;
}

export function isFlood(text) {
  const words = text.split(/\s+/);
  if (words.length < 5) return false;
  const unique = new Set(words.map((w) => w.toLowerCase()));
  return unique.size / words.length < 0.2;
}

export function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > MAX_HISTORY) return false;
  for (const m of messages) {
    if (!m || typeof m !== 'object') return false;
    if (!['user', 'assistant'].includes(m.role)) return false;
    if (typeof m.content !== 'string') return false;
  }
  return true;
}
