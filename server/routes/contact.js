const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Basic server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format.',
      });
    }
    const contact = new Contact({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() });
    await contact.save();
    return res.status(201).json({
      success: true,
      message: 'Message received!',
    });
  } catch (err) {
    console.error('Contact save error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
});
module.exports = router;
