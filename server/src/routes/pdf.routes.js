const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth.middleware');
const { extractPdfText } = require('../controllers/pdf.controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/extract', protect, upload.single('file'), extractPdfText);

module.exports = router;
