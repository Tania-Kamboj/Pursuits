const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
} = require('../controllers/degreeCategoryController');

// GET /api/v1/degree-categories
// POST /api/v1/degree-categories
router.route('/')
  .get(getAllCategories)
  .post(createCategory);

// GET /api/v1/degree-categories/:id
router.route('/:id')
  .get(getCategoryById);

module.exports = router;