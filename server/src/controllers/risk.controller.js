const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const predictRisk = async (req, res) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict-risk`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error predicting risk:', error.message);
    res.status(500).json({
      success: false,
      message: 'Risk prediction failed'
    });
  }
};

module.exports = {
  predictRisk
};