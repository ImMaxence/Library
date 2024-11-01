// /routes/userRoutes.js
const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware(1), getUserProfile); // get current user connected

module.exports = router;
