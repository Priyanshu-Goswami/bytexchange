const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
  getItemsByCategory,
  getMyListings
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getItems);
router.get('/search', searchItems);
router.get('/category/:category', getItemsByCategory);

// Multer error handler
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'File upload error' });
    }
    next();
  });
};

// Protected routes
router.get('/my-listings', protect, getMyListings);
router.post('/', protect, handleUpload, createItem);
router.put('/:id', protect, handleUpload, updateItem);
router.delete('/:id', protect, deleteItem);

// Public - single item (placed after specific routes to avoid conflicts)
router.get('/:id', getItemById);

module.exports = router;
