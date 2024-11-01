// /routes/userRoutes.js
const express = require('express');
const { getAllData } = require('../controllers/BOController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/backoffice', authMiddleware(2), getAllData);

module.exports = router;
