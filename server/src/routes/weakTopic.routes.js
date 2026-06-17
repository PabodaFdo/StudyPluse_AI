const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { predictWeakTopic } = require('../controllers/weakTopic.controller');

router.use(protect);

router.post('/predict', predictWeakTopic);

module.exports = router;
