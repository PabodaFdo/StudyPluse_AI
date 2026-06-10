const express = require('express');
const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'StudyPulse API is healthy 🟢',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
