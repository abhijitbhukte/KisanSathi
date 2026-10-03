const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
router.post('/register', async (req, res) => {
  const { phoneNumber, name, location, preferredLanguage, password } = req.body;

  try {
    const userExists = await User.findOne({ phoneNumber });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      phoneNumber,
      name,
      location,
      preferredLanguage,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        location: user.location,
        preferredLanguage: user.preferredLanguage,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        location: user.location,
        preferredLanguage: user.preferredLanguage,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all users (for demo/testing)
// @route   GET /api/users
// @access  Public
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get user profile
// @route   GET /api/users/:phone
// @access  Public
router.get('/users/:phone', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phone }).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
