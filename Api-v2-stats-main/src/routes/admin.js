const express = require('express');
const router = express.Router({ mergeParams: true });
const { stats } = require('../controllers/adminController');

router.get('/:scrutinId/stats', stats);

module.exports = router;
