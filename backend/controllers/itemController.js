const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'Available' })
      .populate('seller', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('seller', 'name email phone');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new item
// @route   POST /api/items
const createItem = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const image = req.file ? req.file.path : 'https://via.placeholder.com/400x300?text=No+Image';

    const item = await Item.create({
      title,
      description,
      category,
      price,
      image,
      seller: req.user._id
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    if (item.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    const { title, description, category, price, status } = req.body;

    item.title = title || item.title;
    item.description = description || item.description;
    item.category = category || item.category;
    item.price = price || item.price;
    item.status = status || item.status;

    if (req.file) {
      item.image = req.file.path;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    if (item.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search items by keyword
// @route   GET /api/items/search?q=keyword
const searchItems = async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({ message: 'Please provide a search keyword' });
    }

    const items = await Item.find({
      status: 'Available',
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }).populate('seller', 'name email phone').sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Filter items by category
// @route   GET /api/items/category/:category
const getItemsByCategory = async (req, res) => {
  try {
    const items = await Item.find({
      category: req.params.category,
      status: 'Available'
    }).populate('seller', 'name email phone').sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get items posted by logged-in user
// @route   GET /api/items/my-listings
const getMyListings = async (req, res) => {
  try {
    const items = await Item.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
  getItemsByCategory,
  getMyListings
};
