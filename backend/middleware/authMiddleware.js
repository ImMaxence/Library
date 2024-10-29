const passport = require('passport');

module.exports = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return next({ status: 401, message: 'No token provided' });
    }

    // Ajoute le token au header Authorization pour que Passport puisse l'utiliser
    req.headers.authorization = `Bearer ${token}`;

    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ isAuthenticated: false, message: 'Authentication error', error: err });
        }
        if (!user) {
            return res.status(403).json({ isAuthenticated: false, message: 'Failed to authenticate token' });
        }

        // Si l'utilisateur est authentifié, ajoutez l'utilisateur à la requête
        req.user = user;
        next();
    })(req, res, next);
};
