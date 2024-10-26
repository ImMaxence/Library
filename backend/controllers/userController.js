const User = require('../models/User');

// get user connecté
exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'username'] });

        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error)
    }
};
