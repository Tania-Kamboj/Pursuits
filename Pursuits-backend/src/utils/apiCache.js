const cache = new Map();

const apiCache = (ttlMs = 5 * 60 * 1000) => (req, res, next) => {
  if (req.method !== 'GET') return next();

  const key = req.originalUrl;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < ttlMs) {
    res.set('X-Cache', 'HIT');
    res.set('Cache-Control', 'public, max-age=300');
    return res.json(hit.data);          // ⚡ DB skip — instant response
  }

  const oldJson = res.json.bind(res);
  res.json = (body) => {
    cache.set(key, { data: body, time: Date.now() });
    res.set('X-Cache', 'MISS');
    res.set('Cache-Control', 'public, max-age=300');
    return oldJson(body);
  };
  next();
};

module.exports = apiCache;