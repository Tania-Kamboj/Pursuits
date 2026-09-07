const escapeRegex = require('./escapeRegex');

const safe = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);
const rx = (v) => ({ $regex: escapeRegex(v), $options: 'i' });
const exact = (v) => ({ $regex: `^${escapeRegex(v)}$`, $options: 'i' });
const wordStart = (v) => ({ $regex: `^${escapeRegex(v)}\\b`, $options: 'i' });

const STREAM_ALIASES = {
  'humanities': 'Arts',
  'arts': 'Arts',
  'arts / humanities': 'Arts',
  'bio': 'PCB',
  'biology': 'PCB',
  'medical': 'PCB',
  'math': 'PCM',
  'maths': 'PCM',
  'engineering': 'PCM',
  'commerce': 'Commerce',
};

const normalizeStream = (name) => {
  if (!name) return name;
  const lower = name.toLowerCase().trim();
  return STREAM_ALIASES[lower] || name; // Agar dictionary mein mila toh alias do, warna original wapas karo
};

const applyProjection = (req, allowedFields) => {
  const fieldsParam = safe(req.query.fields);
  if (!fieldsParam) return '';
  return fieldsParam.split(',').map(f => f.trim())
    .filter(f => allowedFields.includes(f)).join(' ');
};


module.exports = { safe, rx, exact, wordStart, normalizeStream, applyProjection };