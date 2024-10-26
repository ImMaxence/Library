// server.js
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const sequelize = require('./config/db');
const cors = require('cors');

dotenv.config();
require('./config/passport')(passport);

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
