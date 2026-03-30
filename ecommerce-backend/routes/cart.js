const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

// ✅ Add product to cart
router.post('/add', authMiddleware, async (req, res) => {
    const { name, price, img, qty } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        // check if product already exists
        const existing = cart.products.find(p => p.name === name);

        if (existing) {
            existing.quantity += qty || 1;
        } else {
            cart.products.push({
                name,
                price,
                img,
                quantity: qty || 1
            });
        }

        await cart.save();

        res.json({
            message: "Product added to cart",
            cart
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// ✅ Get user cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        res.json(cart || { products: [] });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// ✅ Remove item from cart
router.delete('/remove/:id', authMiddleware, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        cart.products = cart.products.filter(
            item => item._id.toString() !== req.params.id
        );

        await cart.save();

        res.json({
            message: "Item removed",
            cart
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// ✅ Update quantity
router.put('/update/:id', authMiddleware, async (req, res) => {
    const { qty } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        cart.products.forEach(item => {
            if (item._id.toString() === req.params.id) {
                item.quantity = qty;
            }
        });

        await cart.save();

        res.json({
            message: "Quantity updated",
            cart
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;