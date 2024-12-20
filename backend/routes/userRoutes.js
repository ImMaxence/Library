const express = require('express');
const { getUserProfile, getAllUser, deleteUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { upload, resizeImage } = require('../utils/multerConfig');

router.get('/profile', authMiddleware(1), getUserProfile); // get current user connected
router.get('/get-all', authMiddleware(2), getAllUser)
router.delete('/delete-user/:id', authMiddleware(1), deleteUser)
router.put('/update-user/:id', authMiddleware(1), upload.single('image'), resizeImage, updateUser);

module.exports = router;
