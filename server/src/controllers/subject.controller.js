const asyncHandler = require('../utils/asyncHandler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all subjects for user
// @route   GET /api/subjects
// @access  Private
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await prisma.subject.findMany({
    where: { userId: req.user.id }
  });
  res.status(200).json(subjects);
});

// @desc    Create a subject
// @route   POST /api/subjects
// @access  Private
const createSubject = asyncHandler(async (req, res) => {
  const subjectName = req.body.subjectName || req.body.name;
  
  if (!subjectName) {
    res.status(400);
    throw new Error('Please provide a subject name');
  }

  const subject = await prisma.subject.create({
    data: {
      name: subjectName,
      code: req.body.code,
      credits: req.body.credits,
      gradeTarget: req.body.gradeTarget,
      currentStanding: req.body.currentStanding,
      status: req.body.status,
      description: req.body.description,
      userId: req.user.id
    }
  });
  res.status(201).json(subject);
});

// @desc    Get a single subject
// @route   GET /api/subjects/:id
// @access  Private
const getSubject = asyncHandler(async (req, res) => {
  const subject = await prisma.subject.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  });

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  res.status(200).json(subject);
});

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = asyncHandler(async (req, res) => {
  const subject = await prisma.subject.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  });

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  const subjectName = req.body.subjectName || req.body.name;

  const updatedSubject = await prisma.subject.update({
    where: { id: subject.id },
    data: { 
      name: subjectName || subject.name,
      code: req.body.code !== undefined ? req.body.code : subject.code,
      credits: req.body.credits !== undefined ? req.body.credits : subject.credits,
      gradeTarget: req.body.gradeTarget !== undefined ? req.body.gradeTarget : subject.gradeTarget,
      currentStanding: req.body.currentStanding !== undefined ? req.body.currentStanding : subject.currentStanding,
      status: req.body.status !== undefined ? req.body.status : subject.status,
      description: req.body.description !== undefined ? req.body.description : subject.description
    }
  });

  res.status(200).json(updatedSubject);
});

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await prisma.subject.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  });

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  await prisma.subject.delete({
    where: { id: subject.id }
  });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getSubjects,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject
};
