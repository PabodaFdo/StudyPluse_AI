const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getStudyGarden,
  getGrowthActivities,
  addPoints
} = require('../controllers/garden.controller');

router.use(protect);

router.get('/', getStudyGarden);
router.get('/activities', getGrowthActivities);
router.post('/add-points', addPoints);

module.exports = router;
