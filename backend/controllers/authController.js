const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return next({ status: 409, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next({ status: 401, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, // Empêche l'accès via JavaScript
            secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
            sameSite: 'Strict', // Protection CSRF
            maxAge: 3600000, // Durée de vie d'une heure
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};

// exports.verifyToken = (req, res, next) => {
//     const token = req.cookies.token; // Récupérer le token du cookie
//     if (!token) {
//         return next({ status: 401, message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return next({ status: 403, message: 'Failed to authenticate token' });
//         }

//         res.json({ message: 'Token is valid', userId: decoded.id });
//     });
// };
