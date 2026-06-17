const axios = require('axios');

exports.predictWeakTopic = async (req, res) => {
  try {
    const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    const response = await axios.post(`${ML_SERVICE_URL}/predict-weak-topic`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error in predictWeakTopic:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Weak topic prediction failed' 
    });
  }
};
