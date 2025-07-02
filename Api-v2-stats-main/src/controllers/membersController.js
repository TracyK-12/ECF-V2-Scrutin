const { getMembersByScrutin, voteMember } = require('../models/member');

async function list(req, res) {
  const scrutinId = parseInt(req.params.scrutinId, 10);
  res.json({ data: await getMembersByScrutin(scrutinId) });
}

async function vote(req, res) {
  const { scrutinId, id } = req.params;
  try {
    await voteMember(parseInt(id, 10), parseInt(scrutinId, 10));
    res.json({ message: 'Vote recorded' });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = { list, vote };
