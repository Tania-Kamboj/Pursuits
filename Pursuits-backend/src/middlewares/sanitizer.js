const clean = (value) => {
  if (Array.isArray(value)) return value.map(clean);

  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith('$') || key.includes('.')) continue;
      result[key] = clean(val);
    }
    return result;
  }
  return value;
};

const sanitizer = () => (req, res, next) => {
  if (req.body) req.body = clean(req.body);
  next();
};

module.exports = sanitizer;