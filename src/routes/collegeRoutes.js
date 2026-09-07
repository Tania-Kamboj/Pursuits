const express = require('express');
const { getCollegeById } = require('../controllers/collegeController');

const router = express.Router();

router.route('/:id').get(getCollegeById);

module.exports = router;