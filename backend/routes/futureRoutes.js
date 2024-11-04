const express = require('express');
const { addFutureBook, updateFutureBook, deleteFutureBook, getAllFutureBooks } = require('../controllers/futureController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { upload, resizeImage } = require('../utils/multerConfig');

router.post('/create-book', authMiddleware(2), upload.single('image'), resizeImage, addFutureBook)
router.put('/update-book/:id', authMiddleware(2), upload.single('image'), resizeImage, updateFutureBook)
router.delete('/delete-book/:id', authMiddleware(2), deleteFutureBook)
router.get('/get-all', authMiddleware(1), getAllFutureBooks)

module.exports = router;
