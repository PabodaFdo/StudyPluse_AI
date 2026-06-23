const summaryService = require('../services/summary.service');

const generateSummary = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Text is required for summary generation.'
      });
    }

    const result = await summaryService.generateSummary(text);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Summary Generation Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during summary generation.'
    });
  }
};

module.exports = {
  generateSummary
};
