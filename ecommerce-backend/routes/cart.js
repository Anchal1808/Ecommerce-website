const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth'); // JWT verify

// Add product to cart
router.post('/add', authMiddleware, async (req, res) => {
    const { name, price } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        // Check if product exists
        const existing = cart.products.find(p => p.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.products.push({ name, price });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get user's cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        res.json(cart || { products: [] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;