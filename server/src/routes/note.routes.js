const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
  markNoteRevised
} = require('../controllers/note.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

router.patch('/:id/revised', markNoteRevised);

module.exports = router;
