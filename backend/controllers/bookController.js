const Book = require('../models/Book');
const { Op } = require('sequelize');

exports.getAllBooks = async (req, res, next) => {
    try {
        const { title, author, minPrice, maxPrice } = req.query;

        const whereConditions = {};

        if (title) {
            whereConditions.title = { [Op.like]: `%${title}%` };
        }
        if (author) {
            whereConditions.author = { [Op.like]: `%${author}%` };
        }
        if (minPrice) {
            whereConditions.price = { ...whereConditions.price, [Op.gte]: parseFloat(minPrice) };
        }
        if (maxPrice) {
            whereConditions.price = { ...whereConditions.price, [Op.lte]: parseFloat(maxPrice) };
        }

        const books = await Book.findAll({
            where: whereConditions,
            attributes: ['id', 'title', 'author', 'price', 'image']
        });

        const withImages = books.map(item => {
            if (item.image && Buffer.isBuffer(item.image)) {
                console.log(`Converting image for book ${item.id} to Base64`);
                const imageBase64 = item.image.toString('base64');
                item.image = `data:image/jpeg;base64,${imageBase64}`;
            }
            return item;
        });

        res.json(withImages);
    } catch (error) {
        next(error);
    }
};

exports.addBook = async (req, res, next) => {
    try {
        let imageFile = req.file.buffer
        console.log("IMAGE : ", imageFile)
        const { title, author, price } = req.body;
        const book = await Book.create({ title, author, price, image: imageFile });
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

        book.title = title
        book.author = author
        book.price = price

        if (req.file) {
            console.log("Image found, saving as binary UPDATE BOOK");
            book.image = req.file.buffer;
        }

        await book.save();
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