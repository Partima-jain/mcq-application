const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// api call to show all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.render('teacher', { 
      title: 'Teacher Dashboard',
      questions 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// add new question
router.post('/add-question', async (req, res) => {
  try {
    const { question, option1, option2, option3, option4 } = req.body;
    
    const newQuestion = new Question({
      question,
      options: [option1, option2, option3, option4]
    });
    
    await newQuestion.save();
    res.redirect('/teacher');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// api call to Delete question
router.post('/delete-question/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.redirect('/teacher');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;