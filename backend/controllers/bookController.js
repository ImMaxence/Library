// /controllers/bookController.js
const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = await Book.create({ title, author, genre });
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
