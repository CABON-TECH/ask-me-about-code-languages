const asyncHandler = require('express-async-handler');
const Question = require('../models/questionModel');

// Submit a question
const submitQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;

	// Check if req.user exists and has _id property
  if (!req.user || !req.user._id) {
    res.status(401).json({ error: 'User not authenticated.' });
    return;
  }
  const userId = req.user._id; // Assuming you have user authentication middleware

  if (!question) {
    res.status(400).json({ error: 'Question is required.' });
    return;
  }

  // Create a new question
  const newQuestion = await Question.create({
    question,
    user: userId,
  });

  res.status(201).json(newQuestion);
});

module.exports = {
  submitQuestion,
};
