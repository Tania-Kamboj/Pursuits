const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  toggleWishlistItem,
  getMyWishlist,
  getWishlistStatus,
  removeWishlistItem,
} = require('../controllers/wishlistController');

const router = express.Router();

router.use(protect);

router.post('/toggle', toggleWishlistItem);
router.get('/status', getWishlistStatus);
router.get('/', getMyWishlist);
router.delete('/:id', removeWishlistItem);

module.exports = router;