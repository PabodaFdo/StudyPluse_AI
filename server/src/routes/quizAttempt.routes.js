const express = require('express');
const router = express.Router();
const {
  createQuizAttempt,
  getQuizAttempts,
  getQuizAttemptStats,
  getTopicQuizAttemptStats
} = require('../controllers/quizAttempt.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
  .post(createQuizAttempt)
  .get(getQuizAttempts);

router.route('/stats')
  .get(getQuizAttemptStats);

router.route('/topic/:noteId')
  .get(getTopicQuizAttemptStats);

module.exports = router;
