const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const cache = new Map<string, { data: any; time: number }>();

export async function apiGet(path: string, ttl = 5 * 60 * 1000) {
  const hit = cache.get(path);
  if (hit && Date.now() - hit.time < ttl) return hit.data;   // ⚡ instant
  const res = await fetch(`${API_URL}${path}`);
  const data = await res.json();
  cache.set(path, { data, time: Date.now() });
  return data;
}