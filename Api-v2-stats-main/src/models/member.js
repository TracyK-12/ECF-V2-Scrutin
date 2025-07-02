const { getDb } = require("./db");

async function getMembersByScrutin(scrutinId) {
  return getDb().all(
    "SELECT m.id, m.first_name, m.last_name, m.birth_date, " +
      "CASE WHEN v.id IS NULL THEN 0 ELSE 1 END AS has_voted " +
      "FROM members m " +
      "LEFT JOIN votes v " +
      "ON m.id = v.member_id AND m.scrutin_id = v.scrutin_id " +
      "WHERE m.scrutin_id = ? " +
      "ORDER BY m.last_name, m.first_name",
    scrutinId
  );
}


async function voteMember(memberId, scrutinId) {
  const db = getDb();
  const { starts_at, ends_at } = await db.get(
    "SELECT starts_at, ends_at FROM scrutins WHERE id = ?",
    scrutinId
  );
  const now = new Date().toISOString();

  await db.run(
    "INSERT INTO votes (member_id, scrutin_id, voted_at) VALUES (?, ?, ?)",
    memberId,
    scrutinId,
    now
  );
}

// New: stats for a scrutin
async function getStats(scrutinId) {
  const db = getDb();
  // total registered
  const total = await db.get(
    "SELECT COUNT(*) AS count FROM members WHERE scrutin_id = ?",
    scrutinId
  );
  // total voted
  const voted = await db.get(
    "SELECT COUNT(*) AS count FROM votes WHERE scrutin_id = ?",
    scrutinId
  );
  return { total: total.count, voted: voted.count };
}

module.exports = { getMembersByScrutin, voteMember, getStats };
