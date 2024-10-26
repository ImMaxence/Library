// /routes/bookRoutes.js
const express = require('express');
const { getAllBooks, addBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllBooks);
router.post('/', authMiddleware, addBook);

module.exports = router;
