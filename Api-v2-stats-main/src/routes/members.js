const express = require('express');
const router = express.Router({ mergeParams: true });
const { list, vote } = require('../controllers/membersController');

router.get('/', list);
router.post('/:id/vote', vote);

module.exports = router;
