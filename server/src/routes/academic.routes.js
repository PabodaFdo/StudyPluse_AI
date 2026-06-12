const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getAcademicRecords,
  createAcademicRecord,
  updateAcademicRecord,
  deleteAcademicRecord
} = require('../controllers/academic.controller');

router.use(protect);

router.route('/')
  .get(getAcademicRecords)
  .post(createAcademicRecord);

router.route('/:id')
  .put(updateAcademicRecord)
  .delete(deleteAcademicRecord);

module.exports = router;
