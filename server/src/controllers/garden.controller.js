const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');
const { calculatePlantStage, addGrowthPoints } = require('../services/garden.service');

const prisma = new PrismaClient();

// @desc    Get user's study garden
// @route   GET /api/study-garden
// @access  Private
const getStudyGarden = asyncHandler(async (req, res) => {
  let garden = await prisma.studyGarden.findUnique({
    where: { userId: req.user.id }
  });

  if (!garden) {
    garden = await prisma.studyGarden.create({
      data: { userId: req.user.id, level: 1 }
    });
  }

  const stage = calculatePlantStage(garden.level);

  res.json({
    ...garden,
    stage
  });
});

// @desc    Get user's growth activities
// @route   GET /api/study-garden/activities
// @access  Private
const getGrowthActivities = asyncHandler(async (req, res) => {
  const activities = await prisma.growthActivity.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });

  res.json(activities || []);
});

// @desc    Add points manually to study garden
// @route   POST /api/study-garden/add-points
// @access  Private
const addPoints = asyncHandler(async (req, res) => {
  const { points, actionType, description } = req.body;

  if (!points || !actionType || !description) {
    res.status(400);
    throw new Error('Please provide points, actionType, and description');
  }

  await addGrowthPoints(req.user.id, parseInt(points), actionType, description);

  res.status(200).json({ message: 'Points added successfully' });
});

module.exports = {
  getStudyGarden,
  getGrowthActivities,
  addPoints
};
