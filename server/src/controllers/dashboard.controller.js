const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Get dashboard summary stats
// @route   GET /api/dashboard/summary
// @access  Private
const getDashboardSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [
    notesCount,
    subjectsCount,
    focusSessionsCount,
    academicRecordsCount,
    garden
  ] = await Promise.all([
    prisma.note.count({ where: { userId } }),
    prisma.subject.count({ where: { userId } }),
    prisma.focusSession.count({ where: { userId } }),
    prisma.academicRecord.count({ where: { userId } }),
    prisma.studyGarden.findUnique({ where: { userId } })
  ]);

  res.json({
    notesCount: notesCount || 0,
    subjectsCount: subjectsCount || 0,
    focusSessionsCount: focusSessionsCount || 0,
    academicRecordsCount: academicRecordsCount || 0,
    gardenLevel: garden ? garden.level : 0
  });
});

// @desc    Get dashboard charts data
// @route   GET /api/dashboard/charts
// @access  Private
const getDashboardCharts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [focusSessions, academicRecords] = await Promise.all([
    prisma.focusSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: { duration: true, createdAt: true, subject: { select: { name: true } } }
    }),
    prisma.academicRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: { grade: true, createdAt: true, subject: { select: { name: true } } }
    })
  ]);

  res.json({
    focusSessions: focusSessions || [],
    academicRecords: academicRecords || []
  });
});

module.exports = {
  getDashboardSummary,
  getDashboardCharts
};
