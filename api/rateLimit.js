const store = new Map();
const WINDOW_MIN = 60 * 1000;
const WINDOW_HOUR = 60 * WINDOW_MIN;
const WINDOW_DAY = 24 * WINDOW_HOUR;

const LIMITS = { min: 5, hour: 20, day: 50 };

function cleanExpired() {
  const now = Date.now();
  for (const [key, entry] of store) {
    entry.min = entry.min.filter((t) => now - t < WINDOW_MIN);
    entry.hour = entry.hour.filter((t) => now - t < WINDOW_HOUR);
    entry.day = entry.day.filter((t) => now - t < WINDOW_DAY);
    if (entry.min.length === 0 && entry.hour.length === 0 && entry.day.length === 0) {
      store.delete(key);
    }
  }
}

setInterval(cleanExpired, 60 * 1000);

function checkRateLimit(ip) {
  if (process.env.NODE_ENV === 'development') return null;

  const now = Date.now();
  let entry = store.get(ip);
  if (!entry) {
    entry = { min: [], hour: [], day: [] };
    store.set(ip, entry);
  }

  entry.min = entry.min.filter((t) => now - t < WINDOW_MIN);
  entry.hour = entry.hour.filter((t) => now - t < WINDOW_HOUR);
  entry.day = entry.day.filter((t) => now - t < WINDOW_DAY);

  if (entry.day.length >= LIMITS.day) {
    return { limited: true, reason: 'Limite diario alcanzado (50 msgs/dia)' };
  }
  if (entry.hour.length >= LIMITS.hour) {
    return { limited: true, reason: 'Limite por hora alcanzado (20 msgs/hora)' };
  }
  if (entry.min.length >= LIMITS.min) {
    return { limited: true, reason: 'Demasiadas solicitudes. Espera un minuto.' };
  }

  entry.min.push(now);
  entry.hour.push(now);
  entry.day.push(now);

  return null;
}

module.exports = { checkRateLimit };
