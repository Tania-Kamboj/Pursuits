const express = require('express');
const router = express.Router();
const {
  getAllStreams, getStreamById, getStreamByName, createStream
} = require('../controllers/streamController');

router.route('/').get(getAllStreams).post(createStream);
router.route('/:id').get(getStreamById);
router.route('/name/:name').get(getStreamByName);

module.exports = router;