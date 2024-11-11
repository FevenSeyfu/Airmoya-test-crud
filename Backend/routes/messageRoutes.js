import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        const file = {
            id: Date.now().toString(),
            path: `/uploads/${req.file.filename}`,
        };
        addImage(file);
        res.status(200).json({ message: 'File uploaded successfully', file });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

router.post('/sendMessage', sendMessage);
router.get('/:userId', getMessages);

export default router;