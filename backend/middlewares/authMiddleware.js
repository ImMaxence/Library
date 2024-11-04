const passport = require('passport');

module.exports = (requireRole) => (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return next({ status: 401, message: 'No token provided' });
    }

    req.headers.authorization = `Bearer ${token}`;

    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ isAuthenticated: false, message: 'Authentication error', error: err });
        }
        if (!user) {
            return res.status(403).json({ isAuthenticated: false, message: 'Failed to authenticate token' });
        }
        if (user.role < requireRole) {
            return res.status(403).json({ isAuthenticated: false, message: 'Access denied' });
        }

        req.user = user;
        next();
    })(req, res, next);
};
