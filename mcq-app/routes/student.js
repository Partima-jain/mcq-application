const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// api call to show all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.render('student', { 
      title: 'Student Dashboard',
      questions 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;