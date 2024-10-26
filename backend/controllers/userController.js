// /controllers/userController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'username'] });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
