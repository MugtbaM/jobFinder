// backend/routes/dataEntry.js
const express = require('express');
const router = express.Router();
const { processDataEntry } = require('../controllers/dataController');

router.post('/search-from-data', processDataEntry);

module.exports = router;