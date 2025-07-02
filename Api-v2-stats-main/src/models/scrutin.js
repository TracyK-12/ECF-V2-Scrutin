const { getDb } = require('./db');

async function listScrutins() {
  return getDb().all(
    'SELECT id, title, starts_at, ends_at FROM scrutins ORDER BY starts_at DESC'
  );
}

async function getScrutin(id) {
  return getDb().get(
    'SELECT id, title, starts_at, ends_at FROM scrutins WHERE id = ?',
    id
  );
}

module.exports = { listScrutins, getScrutin };
