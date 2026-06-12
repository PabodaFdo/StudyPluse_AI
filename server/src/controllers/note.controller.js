const asyncHandler = require('../utils/asyncHandler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const gardenService = require('../services/garden.service');

// @desc    Get user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { userId: req.user.id },
    include: { subject: true }
  });
  res.status(200).json(notes);
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, subjectId } = req.body;

  if (!title || !content || !subjectId) {
    res.status(400);
    throw new Error('Please provide title, content and subjectId');
  }

  const subject = await prisma.subject.findFirst({
    where: { id: Number(subjectId), userId: req.user.id }
  });

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found or does not belong to you');
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      subjectId: Number(subjectId),
      userId: req.user.id
    }
  });

  await gardenService.addGrowthPoints(req.user.id, 3, 'Create Note', `Created note: ${note.title}`);

  res.status(201).json(note);
});

// @desc    Get a note
// @route   GET /api/notes/:id
// @access  Private
const getNote = asyncHandler(async (req, res) => {
  const note = await prisma.note.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
    include: { subject: true }
  });

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  res.status(200).json(note);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await prisma.note.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  });

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  if (req.body.subjectId) {
    const subject = await prisma.subject.findFirst({
      where: { id: Number(req.body.subjectId), userId: req.user.id }
    });
    if (!subject) {
      res.status(404);
      throw new Error('Subject not found or does not belong to you');
    }
  }

  const updatedNote = await prisma.note.update({
    where: { id: note.id },
    data: {
      title: req.body.title || note.title,
      content: req.body.content || note.content,
      subjectId: req.body.subjectId ? Number(req.body.subjectId) : note.subjectId
    }
  });

  res.status(200).json(updatedNote);
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await prisma.note.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  });

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  await prisma.note.delete({
    where: { id: note.id }
  });

  res.status(200).json({ id: req.params.id });
});

// @desc    Mark note as revised
// @route   PATCH /api/notes/:id/revised
// @access  Private
const markNoteRevised = asyncHandler(async (req, res) => {
  const note = await prisma.note.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  });

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  const existingActivity = await prisma.growthActivity.findFirst({
    where: { 
      userId: req.user.id, 
      activity: { startsWith: `Revision: Revised Note ${note.id}` } 
    }
  });

  if (!existingActivity) {
    await gardenService.addGrowthPoints(req.user.id, 5, 'Revision', `Revised Note ${note.id}`);
    res.status(200).json({ message: 'Note revised, +5 points added' });
  } else {
    res.status(200).json({ message: 'Note revised, but points were already awarded' });
  }
});

module.exports = {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
  markNoteRevised
};
