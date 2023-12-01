const asyncHandler = require('express-async-handler');
const Question = require('../models/questionModel');
const openaiController = require('./openaiController');

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

  // Get answer from OpenAI API
  const answer = await openaiController.getOpenAIAnswer(question);
	

  res.status(201).json({
    question:newQuestion,
    answer,
  });
});

module.exports = {
  submitQuestion,
};
