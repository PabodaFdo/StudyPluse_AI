const axios = require('axios');
const FormData = require('form-data');

const extractPdfText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'PDF file is required' });
    }

    const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(`${ML_SERVICE_URL}/extract-pdf-text`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('PDF extraction error:', error.message);
    return res.status(500).json({ success: false, message: 'PDF text extraction failed' });
  }
};

module.exports = {
  extractPdfText,
};
