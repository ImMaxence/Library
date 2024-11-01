const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const futurRoutes = require('./routes/futureRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware');
const sequelize = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const User = require('./models/User');
const bcrypt = require('bcrypt');

dotenv.config();
require('./config/passport')(passport);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const FRONTEND = process.env.FRONTEND || 'http://localhost:3000'

app.use(cors({
    origin: FRONTEND,
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/future', futurRoutes)

app.use(errorMiddleware);

const createAdminUser = async () => {
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD
    const existingAdmin = await User.findOne({ where: { username: adminUsername } });

    if (!existingAdmin) {
        const hashedPassword = bcrypt.hash(adminPassword, 10);
        await User.create({ username: adminUsername, password: hashedPassword, role: 2 });
        console.log(`Admin user created with username: ${adminUsername}`);
    } else {
        console.log(`Admin user already exists with username: ${adminUsername}`);
    }
};


const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(async () => {
        await createAdminUser();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
