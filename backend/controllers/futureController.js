const FutureBook = require('../models/FutureBook')

exports.addFutureBook = async (req, res, next) => {
    try {
        const { title, author, date } = req.body
        const book = await FutureBook.create({ title, author, date })
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
        next(err)
    }
}

exports.updateFutureBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, date } = req.body;

        const book = await FutureBook.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Future book not found' });
        }

        await book.update({ title, author, date });
        res.json({ message: 'Future book updated successfully', book });
    } catch (err) {
        next(err);
    }
};

exports.deleteFutureBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await FutureBook.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Future book not found' });
        }

        await book.destroy();
        res.json({ message: 'Future book deleted successfully' });
    } catch (err) {
        next(err);
    }
};

exports.getAllFutureBooks = async (req, res, next) => {
    try {
        const futureBooks = await FutureBook.findAll();
        res.json(futureBooks);
    } catch (error) {
        next(error);
    }
};