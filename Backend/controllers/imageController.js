import multer from 'multer';
import path from 'path';
import { addImage } from '../storage/localStorage.js';

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
    limits: { fileSize: 5 * 1024 * 1024 }, 
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
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const userId = req.body.userId; 
        const newImage = { 
            id: Date.now().toString(), 
            userId, 
            path: req.file.path,
            uploadedAt: new Date().toISOString() 
        };
        
        addImage(newImage);
        res.status(200).json({ message: 'Image uploaded successfully', file: newImage });
    });
};

import { getCollection } from '../storage/localStorage.js';

export const getImagesByUserId = (req, res) => {
    const userId = req.params.id;
    const images = getCollection('images');

    const userImages = images.filter(image => image.userId === userId);

    if (userImages.length === 0) {
        return res.status(404).json({ message: 'No images found for this user.' });
    }

    res.status(200).json(userImages);
};