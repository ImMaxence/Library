const express = require('express');
const { getUserProfile, getAllUser, deleteUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware(1), getUserProfile); // get current user connected
router.get('/get-all', authMiddleware(2), getAllUser)
router.delete('/delete-user', authMiddleware(1), deleteUser)
router.put('/update-user', authMiddleware(1), updateUser)

module.exports = router;
