const express = require('express');
const router = express.Router();

// POST /api/contact
// MongoDB removed — messages are logged to console for now
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
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

  // Log to console (no DB for now)
  console.log('📬 New contact message:', { name, email, message });

  return res.status(201).json({
    success: true,
    message: 'Message received!',
  });
});

module.exports = router;
