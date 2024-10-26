// /controllers/userController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'username'] });
        res.json(user);
    } catch (error) {
        next(error)
    }
};
