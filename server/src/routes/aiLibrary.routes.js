const express = require('express');
const router = express.Router();
const aiLibraryController = require('../controllers/aiLibrary.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

// Summaries
router.post('/summaries', aiLibraryController.saveSummary);
router.get('/summaries', aiLibraryController.getSummaries);
router.get('/summaries/:id', aiLibraryController.getSummaryById);
router.delete('/summaries/:id', aiLibraryController.deleteSummary);

// Quizzes
router.post('/quizzes', aiLibraryController.saveQuiz);
router.get('/quizzes', aiLibraryController.getQuizzes);
router.get('/quizzes/:id', aiLibraryController.getQuizById);
router.delete('/quizzes/:id', aiLibraryController.deleteQuiz);

// Flashcards
router.post('/flashcards', aiLibraryController.saveFlashcards);
router.get('/flashcards', aiLibraryController.getFlashcards);
router.get('/flashcards/:id', aiLibraryController.getFlashcardsById);
router.delete('/flashcards/:id', aiLibraryController.deleteFlashcards);

module.exports = router;
