import multer from 'multer';
import path from 'path';
import { getCollection, saveCollection } from '../storage/localStorage.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only JPG, JPEG, or PNG images are allowed.'));
    }
}).single('image');

export const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const images = getCollection('images');
        const newImage = { id: Date.now().toString(), path: req.file.path };
        images.push(newImage);
        saveCollection('images', images);
        res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
    });
};