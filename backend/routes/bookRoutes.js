const express = require('express');
const { getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { upload, resizeImage } = require('../utils/multerConfig');

router.get('/get-all', authMiddleware(1), getAllBooks);
router.post('/create-book', authMiddleware(2), upload.single('image'), resizeImage, addBook);
router.put('/update-book/:id', authMiddleware(2), upload.single('image'), resizeImage, updateBook)
router.delete('/delete-book/:id', authMiddleware(2), deleteBook)

module.exports = router;
