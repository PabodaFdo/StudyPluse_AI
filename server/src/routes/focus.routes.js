const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { getFocusSessions, createFocusSession, getFocusAnalytics } = require('../controllers/focus.controller');

router.use(protect);

router.route('/')
  .get(getFocusSessions)
  .post(createFocusSession);

router.get('/analytics', getFocusAnalytics);

module.exports = router;
