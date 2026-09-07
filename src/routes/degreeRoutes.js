const express = require('express');
const router = express.Router();
const { getAllDegrees, getDegreeById } = require('../controllers/degreeController');
const { getDegreeColleges } = require('../controllers/collegeController');


router.route('/').get(getAllDegrees);
router.route('/:id').get(getDegreeById);
router.route('/:id/colleges').get(getDegreeColleges);

module.exports = router;