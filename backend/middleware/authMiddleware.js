// /middleware/authMiddleware.js
const passport = require('passport');

module.exports = passport.authenticate('jwt', { session: false });
