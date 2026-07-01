import { useState, useEffect, useCallback } from 'react';

const GITHUB_USERNAME = 'zahirbombap-hub';
const API_BASE = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const STORAGE_KEY = 'gh-contributions-v3';
const CACHE_TTL = 10 * 60 * 1000;

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 15) return 3;
  return 4;
}

function getCachedData() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedData(data) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
  }
}

export function useGitHubContributions() {
  const [data, setData] = useState(() => getCachedData());
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  const fetchContributions = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cached = getCachedData();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error(`Error ${res.status} al consultar contribuciones`);
      }

      const json = await res.json();
      const raw = json.contributions || [];

      let totalCount = 0;
      if (json.total && typeof json.total === 'object') {
        for (const y of Object.values(json.total)) {
          totalCount += Number(y) || 0;
        }
      } else {
        totalCount = raw.reduce((s, d) => s + (d.count || 0), 0);
      }

      const now = new Date();
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const recent = raw.filter((d) => {
        const dt = new Date(d.date + 'T00:00:00');
        return dt >= oneYearAgo && dt <= now;
      });

      const weeks = [];
      let currentWeek = [];

      for (const day of recent) {
        currentWeek.push({
          date: day.date,
          count: day.count || 0,
          level: day.level ?? getLevel(day.count || 0),
        });
        const dt = new Date(day.date + 'T00:00:00');
        if (dt.getDay() === 6) {
          weeks.push({ contributionDays: currentWeek });
          currentWeek = [];
        }
      }
      if (currentWeek.length > 0) {
        weeks.push({ contributionDays: currentWeek });
      }

      while (weeks.length > 0 && weeks[0].contributionDays.length < 7) {
        weeks[0].contributionDays.unshift({
          date: '',
          count: 0,
          level: 0,
        });
      }

      const mapped = { totalContributions: totalCount, weeks };
      setCachedData(mapped);
      setData(mapped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  return { data, loading, error, refetch: fetchContributions };
}
