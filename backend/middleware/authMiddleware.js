const passport = require('passport');

module.exports = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return next({ status: 401, message: 'No token provided' });
    }

    // Ajoute le token au header Authorization pour que Passport puisse l'utiliser
    req.headers.authorization = `Bearer ${token}`;

    // Utilise Passport pour authentifier le token
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ status: 403, message: 'Failed to authenticate token' });
        }
        req.user = user; // Ajoute l'utilisateur à la requête, pour partie admin plus tard
        next();
    })(req, res, next);
};
