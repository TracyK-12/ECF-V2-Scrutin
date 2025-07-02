const express = require("express");
const { initDb } = require("./models/db");
const scrutinsRoutes = require("./routes/scrutins");
const membersRoutes = require("./routes/members");
const adminRoutes = require("./routes/admin");
const cors = require("cors");

async function start() {
  await initDb();
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/api/v1/scrutins", scrutinsRoutes);
  app.use("/api/v1/scrutins/:scrutinId/members", membersRoutes);
  app.use("/api/v1/scrutins", adminRoutes);

  app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));

  const PORT = process.env.API_PORT || 3000;
  app.listen(PORT, () => console.log("API v1 listening on port 3000"));
}

start();
