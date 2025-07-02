const { getStats } = require('../models/member');

async function stats(req, res) {
  const scrutinId = parseInt(req.params.scrutinId, 10);
  res.json({ data: await getStats(scrutinId) });
}

module.exports = { stats };
