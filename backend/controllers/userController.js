const User = require('../models/User');
const bcrypt = require('bcrypt');

// get user connecté
exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'username', 'password', 'role', 'image'] });

        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }

        if (user.image && Buffer.isBuffer(user.image)) {
            console.log("Image found, converting to Base64");
            const imageBase64 = user.image.toString('base64');
            const imageSrc = `data:image/jpeg;base64,${imageBase64}`; // pour le front

            user.image = imageSrc;
        } else {
            console.log("No image found for the user");
        }

        res.json(user);
    } catch (error) {
        next(error)
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'username', 'role', 'image', 'password'] });

        // si user à une image alors convertir en base64
        const usersWithImages = users.map(user => {
            if (user.image && Buffer.isBuffer(user.image)) {
                console.log(`Converting image for user ${user.id} to Base64`);
                const imageBase64 = user.image.toString('base64');
                user.image = `data:image/jpeg;base64,${imageBase64}`;
            }
            return user;
        });

        res.json(usersWithImages);
    } catch (err) {
        next(err);
    }
};

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
        const { username, password, role, passwordChanged } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }

        if (username && username !== user.username) {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return next({ status: 409, message: 'Username already taken' });
            }
            user.username = username;
        }

        if (password && passwordChanged) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (role) {
            user.role = role;
        }

        if (req.file) {
            console.log("Image found USER, saving as binary");
            user.image = req.file.buffer;
        }

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error('Error details UPDATE USER:', err);
        next(err);
    }
};
