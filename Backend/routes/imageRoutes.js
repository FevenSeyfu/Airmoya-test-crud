import express from 'express';
import { uploadImage,getImagesByUserId }  from '../controllers/imageController.js';
const router = express.Router();

router.post('/upload', uploadImage);
router.get('/:id', getImagesByUserId);

export default router
