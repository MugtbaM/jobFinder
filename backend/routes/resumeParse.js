// backend/routes/resumeParse.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { processResume } = require('../controllers/resumeController');

// const upload = multer({ dest: 'uploads/' });

// router.post('/parse_resume', upload.single('resume'), processResume);

// module.exports = router;

// backend/routes/resumeParse.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { processResume } = require('../controllers/resumeController');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const cleanName = file.originalname.replace(ext, '').replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    allowedTypes.includes(ext) ? cb(null, true) : cb(new Error('Only PDF and Word documents are allowed!'));
  },
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

router.post('/parse_resume', upload.single('resume'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Add the file path to the request object
  req.filePath = path.resolve(req.file.path);
  
  // Call the original controller function
  processResume(req, res, next);
});

module.exports = router;