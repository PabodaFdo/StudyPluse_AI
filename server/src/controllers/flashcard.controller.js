const flashcardService = require('../services/flashcard.service');

const generateFlashcards = async (req, res) => {
  try {
    const { text, card_count, difficulty } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Text is required for flashcard generation.'
      });
    }

    const result = await flashcardService.generateFlashcards(text, card_count, difficulty);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Flashcard Generation Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during flashcard generation.'
    });
  }
};

module.exports = {
  generateFlashcards
};
