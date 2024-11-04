const FutureBook = require('../models/FutureBook')

exports.addFutureBook = async (req, res, next) => {
    try {
        let imageFile = req.file.buffer
        console.log("IMAGE : ", imageFile)
        const { title, author, date } = req.body
        const book = await FutureBook.create({ title, author, date, image: imageFile })
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

        book.title = title
        book.author = author
        book.data = date

        if (req.file) {
            console.log("Image found, saving as binary UPDATE BOOK");
            book.image = req.file.buffer;
        }

        await book.save();
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
        const futureBooks = await FutureBook.findAll({ attributes: ['id', 'title', 'author', 'date', 'image'] });

        const withImages = futureBooks.map(item => {
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