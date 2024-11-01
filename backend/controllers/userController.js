const User = require('../models/User');
const bcrypt = require('bcrypt');

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

exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.findAll()
        res.json(user);
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }

        if (username && username !== user.username) {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return next({ status: 409, message: 'Take an another name, already take' });
            }
            user.username = username;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (role) {
            user.role = role;
        }

        await user.save();
        res.json({ message: 'User update ok', user });
    } catch (err) {
        next(err);
    }
};