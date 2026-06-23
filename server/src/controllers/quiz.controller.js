const quizService = require('../services/quiz.service');

const generateQuiz = async (req, res) => {
  try {
    const { text, question_count, difficulty } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Text is required for quiz generation.'
      });
    }

    const result = await quizService.generateQuiz(text, question_count, difficulty);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Quiz Generation Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during quiz generation.'
    });
  }
};

module.exports = {
  generateQuiz
};
