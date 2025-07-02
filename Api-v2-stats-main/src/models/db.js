const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;

async function initDb() {
  db = await open({ filename: ":memory:", driver: sqlite3.Database });
  await db.exec("PRAGMA foreign_keys = ON;");
  await db.exec(
    "CREATE TABLE IF NOT EXISTS scrutins (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "title TEXT NOT NULL, " +
      "starts_at TEXT NOT NULL, " +
      "ends_at TEXT NOT NULL" +
      ");"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS members (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "first_name TEXT NOT NULL, " +
      "last_name TEXT NOT NULL, " +
      "birth_date TEXT NOT NULL, " +
      "scrutin_id INTEGER NOT NULL, " +
      "FOREIGN KEY(scrutin_id) REFERENCES scrutins(id)" +
      ");"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS votes (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "member_id INTEGER NOT NULL, " +
      "scrutin_id INTEGER NOT NULL, " +
      "voted_at TEXT NOT NULL, " +
      "FOREIGN KEY(member_id) REFERENCES members(id), " +
      "FOREIGN KEY(scrutin_id) REFERENCES scrutins(id), " +
      "UNIQUE(member_id, scrutin_id)" +
      ");"
  );
  // Seed scrutins
  const scrutins = [
    [
      1,
      "Conseil Administration 2025",
      "2025-07-10T09:00:00Z",
      "2025-07-10T17:00:00Z",
    ],
    [
      2,
      "Assemblée Générale 2026",
      "2026-01-15T10:00:00Z",
      "2026-01-15T16:00:00Z",
    ],
  ];
  for (const [id, title, start, end] of scrutins) {
    await db.run(
      "INSERT OR IGNORE INTO scrutins (id, title, starts_at, ends_at) VALUES (?, ?, ?, ?)",
      id,
      title,
      start,
      end
    );
  }
  // Seed members
  const members = [
    ["Alice", "Durand", "1985-02-14", 1],
    ["Bob", "Martin", "1978-06-30", 1],
    ["Carole", "Lefevre", "1990-11-23", 1],
    ["David", "Petit", "1982-03-05", 1],
    ["Emma", "Bernard", "1995-08-19", 1],
    ["Franck", "Dupont", "1975-12-10", 2],
    ["Greta", "Moreau", "1988-04-22", 2],
    ["Hugo", "Lacroix", "1992-09-14", 2],
  ];
  for (const [first, last, birth, sc] of members) {
    await db.run(
      "INSERT OR IGNORE INTO members (first_name, last_name, birth_date, scrutin_id) VALUES (?, ?, ?, ?)",
      first,
      last,
      birth,
      sc
    );
  }
  // Seed votes
  const votes = [
    [1, 1, "2025-07-10T09:30:00Z"],
    [2, 1, "2025-07-10T10:00:00Z"],
    [6, 2, "2026-01-15T10:15:00Z"],
    [7, 2, "2026-01-15T11:00:00Z"],
  ];
  for (const [mId, sc, vt] of votes) {
    await db.run(
      "INSERT OR IGNORE INTO votes (member_id, scrutin_id, voted_at) VALUES (?, ?, ?)",
      mId,
      sc,
      vt
    );
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return db;
}

module.exports = { initDb, getDb };
