const express = require('express');
const router = express.Router();
const { getDiplomas, getDiplomaById } = require('../controllers/diplomaController');

// Routes
router.route('/')
  .get(getDiplomas);

router.route('/:id')
  .get(getDiplomaById);

module.exports = router;