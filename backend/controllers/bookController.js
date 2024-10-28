const Book = require('../models/Book');

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        next(error)
    }
};

exports.addBook = async (req, res, next) => {
    try {
        const { title, author, genre } = req.body;
        const book = await Book.create({ title, author, genre });
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        next(error)
    }
};
