const express = require('express');
const { addFutureBook, updateFutureBook, deleteFutureBook, getAllFutureBooks } = require('../controllers/futureController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-book', authMiddleware(2), addFutureBook)
router.put('/update-book', authMiddleware(2), updateFutureBook)
router.delete('/delete-book', authMiddleware(2), deleteFutureBook)
router.get('/get-all', authMiddleware(1), getAllFutureBooks)

module.exports = router;
