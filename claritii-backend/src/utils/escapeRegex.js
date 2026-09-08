// User input ke regex special characters ko escape karta hai
// (Regex injection / ReDoS attacks se protection)
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = escapeRegex;