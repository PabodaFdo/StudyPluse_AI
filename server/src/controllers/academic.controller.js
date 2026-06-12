const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');
const { addGrowthPoints } = require('../services/garden.service');

const prisma = new PrismaClient();

// @desc    Get all academic records
// @route   GET /api/academic-records
// @access  Private
const getAcademicRecords = asyncHandler(async (req, res) => {
  const records = await prisma.academicRecord.findMany({
    where: { userId: req.user.id },
    include: { subject: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(records || []);
});

// @desc    Create an academic record
// @route   POST /api/academic-records
// @access  Private
const createAcademicRecord = asyncHandler(async (req, res) => {
  const { 
    subjectId, 
    courseCode, 
    courseName, 
    credits, 
    attendancePercentage, 
    assignmentAverage, 
    quizAverage, 
    studyHoursPerWeek, 
    missedDeadlines, 
    previousExamMark, 
    examMark 
  } = req.body;
  
  const letterGrade = req.body.letterGrade || req.body.grade;

  if (!subjectId || !letterGrade) {
    res.status(400);
    throw new Error('Please provide grade and subjectId');
  }

  // Check that subjectId belongs to the logged-in user
  const subject = await prisma.subject.findUnique({ where: { id: parseInt(subjectId) } });
  if (!subject || subject.userId !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to add record for this subject');
  }

  const record = await prisma.academicRecord.create({
    data: {
      grade: letterGrade,
      subjectId: parseInt(subjectId),
      userId: req.user.id,
      ...(courseCode !== undefined && { courseCode }),
      ...(courseName !== undefined && { courseName }),
      ...(credits !== undefined && { credits }),
      ...(attendancePercentage !== undefined && { attendancePercentage }),
      ...(assignmentAverage !== undefined && { assignmentAverage }),
      ...(quizAverage !== undefined && { quizAverage }),
      ...(studyHoursPerWeek !== undefined && { studyHoursPerWeek }),
      ...(missedDeadlines !== undefined && { missedDeadlines }),
      ...(previousExamMark !== undefined && { previousExamMark }),
      ...(examMark !== undefined && { examMark })
    },
    include: { subject: true }
  });

  // Adding academic record gives +3 points
  await addGrowthPoints(req.user.id, 3, 'Academic', 'Added academic record');

  res.status(201).json(record);
});

// @desc    Update an academic record
// @route   PUT /api/academic-records/:id
// @access  Private
const updateAcademicRecord = asyncHandler(async (req, res) => {
  const { 
    subjectId, 
    courseCode, 
    courseName, 
    credits, 
    attendancePercentage, 
    assignmentAverage, 
    quizAverage, 
    studyHoursPerWeek, 
    missedDeadlines, 
    previousExamMark, 
    examMark 
  } = req.body;
  
  const letterGrade = req.body.letterGrade || req.body.grade;
  const { id } = req.params;

  const record = await prisma.academicRecord.findUnique({
    where: { id: parseInt(id) }
  });

  if (!record) {
    res.status(404);
    throw new Error('Academic record not found');
  }

  if (record.userId !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this record');
  }

  if (subjectId) {
    const subject = await prisma.subject.findUnique({ where: { id: parseInt(subjectId) } });
    if (!subject || subject.userId !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update record for this subject');
    }
  }

  const updatedRecord = await prisma.academicRecord.update({
    where: { id: parseInt(id) },
    data: {
      grade: letterGrade || record.grade,
      subjectId: subjectId ? parseInt(subjectId) : record.subjectId,
      ...(courseCode !== undefined && { courseCode }),
      ...(courseName !== undefined && { courseName }),
      ...(credits !== undefined && { credits }),
      ...(attendancePercentage !== undefined && { attendancePercentage }),
      ...(assignmentAverage !== undefined && { assignmentAverage }),
      ...(quizAverage !== undefined && { quizAverage }),
      ...(studyHoursPerWeek !== undefined && { studyHoursPerWeek }),
      ...(missedDeadlines !== undefined && { missedDeadlines }),
      ...(previousExamMark !== undefined && { previousExamMark }),
      ...(examMark !== undefined && { examMark })
    },
    include: { subject: true }
  });

  res.json(updatedRecord);
});

// @desc    Delete an academic record
// @route   DELETE /api/academic-records/:id
// @access  Private
const deleteAcademicRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const record = await prisma.academicRecord.findUnique({
    where: { id: parseInt(id) }
  });

  if (!record) {
    res.status(404);
    throw new Error('Academic record not found');
  }

  if (record.userId !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this record');
  }

  await prisma.academicRecord.delete({
    where: { id: parseInt(id) }
  });

  res.json({ message: 'Academic record removed' });
});

module.exports = {
  getAcademicRecords,
  createAcademicRecord,
  updateAcademicRecord,
  deleteAcademicRecord
};
