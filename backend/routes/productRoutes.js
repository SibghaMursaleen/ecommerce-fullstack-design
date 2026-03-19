const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/products
// @desc    Get all products (with search/filter)
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'All category') {
            query.category = category;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        // Try to find by custom 'id' first, then MongoDB '_id'
        let product = await Product.findOne({ id: req.params.id });
        if (!product && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            product = await Product.findById(req.params.id);
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
