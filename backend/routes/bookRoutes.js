// /routes/bookRoutes.js
const express = require('express');
const { getAllBooks, addBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(1), getAllBooks);
router.post('/', authMiddleware(2), addBook);

module.exports = router;
