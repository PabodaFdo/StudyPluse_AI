const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addGrowthPoints = async (userId, points, actionType, description) => {
  await prisma.growthActivity.create({
    data: {
      userId,
      activity: `${actionType}: ${description} (+${points} pts)`
    }
  });

  const garden = await prisma.studyGarden.findUnique({ where: { userId } });
  if (garden) {
    const newLevel = garden.level + points;
    await prisma.studyGarden.update({
      where: { userId },
      data: { level: newLevel }
    });
  }
};

const calculatePlantStage = (points) => {
  if (points < 10) return 'Seed';
  if (points < 30) return 'Sprout';
  if (points < 60) return 'Seedling';
  if (points < 100) return 'Vegetative';
  return 'Flowering';
};

module.exports = {
  addGrowthPoints,
  calculatePlantStage
};
