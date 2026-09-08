const express = require('express');
const router = express.Router();
const { getExams, getExamById } = require('../controllers/examController');

router.route('/')
  .get(getExams);

router.route('/:id')
  .get(getExamById);

module.exports = router;