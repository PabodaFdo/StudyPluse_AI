const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getDashboardSummary,
  getDashboardCharts
} = require('../controllers/dashboard.controller');

router.use(protect);

router.get('/summary', getDashboardSummary);
router.get('/charts', getDashboardCharts);

module.exports = router;
