const express = require('express');
const { register, login, logout, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-token', authMiddleware(1), verifyToken);

module.exports = router;
