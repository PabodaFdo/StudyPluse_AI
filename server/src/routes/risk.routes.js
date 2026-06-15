const express = require('express');
const router = express.Router();
const { predictRisk } = require('../controllers/risk.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.post('/predict', predictRisk);

module.exports = router;