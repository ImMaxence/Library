const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FutureBook = sequelize.define('FutureBook', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = FutureBook;
