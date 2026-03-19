const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`🔍 Login attempt for: ${email}`);
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log(`❌ Login failed: User not found for email ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(`👤 User found: ${user.email}. Matching password...`);
        const isMatch = await user.matchPassword(password);
        
        if (isMatch) {
            console.log(`✅ Password matched. Generating token...`);
            const token = generateToken(user._id);
            console.log(`🎫 Token generated successfully.`);
            
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            });
        } else {
            console.log(`❌ Login failed: Password mismatch for user ${email}`);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("💥 Login Error Hash:", error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update user password
// @route   PUT /api/auth/password
// @access  Private
router.put('/password', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('+password');

        if (user) {
            const isMatch = await user.matchPassword(req.body.currentPassword);
            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect current password' });
            }

            user.password = req.body.newPassword;
            await user.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
