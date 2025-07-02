const { listScrutins, getScrutin } = require('../models/scrutin');

async function index(req, res) {
  res.json({ data: await listScrutins() });
}

async function show(req, res) {
  const id = parseInt(req.params.id, 10);
  const scrutin = await getScrutin(id);
  if (!scrutin) return res.status(404).json({ error: 'Not found' });
  res.json({ data: scrutin });
}

module.exports = { index, show };
