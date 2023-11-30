const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

// Submit a question
router.post('/submit', protect, questionController.submitQuestion);

module.exports = router;
