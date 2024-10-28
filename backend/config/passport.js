const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findByPk(payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};
