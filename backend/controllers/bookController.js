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
        const { title, author, price } = req.body;
        const book = await Book.create({ title, author, price });
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        next(error)
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, price } = req.body;

        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.update({ title, author, price });
        res.json({ message: 'Book updated successfully', book });
    } catch (err) {
        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.destroy();
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        next(err);
    }
};