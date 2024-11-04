const multer = require('multer');
const sharp = require('sharp');

// utilise multer pour gérer l'upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// redimensionner l'image avec sharp
const resizeImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        // redimensionne et compresse l'image avec sharp
        req.file.buffer = await sharp(req.file.buffer)
            .resize(400, 400) // Dimensions en pixels
            .jpeg({ quality: 80 }) // Compresse avec qualité 80
            .rotate() // EXFIX
            .toBuffer();
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { upload, resizeImage };
