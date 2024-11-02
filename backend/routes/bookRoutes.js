const express = require('express');
const { getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/get-all', authMiddleware(1), getAllBooks);
router.post('/create-book', authMiddleware(2), addBook);
router.put('/update-book/:id', authMiddleware(2), updateBook)
router.delete('/delete-book/:id', authMiddleware(2), deleteBook)

module.exports = router;
