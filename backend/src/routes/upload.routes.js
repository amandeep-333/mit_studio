import { Router } from 'express';
import { upload } from '../config/multer.js';
import { uploadDesign } from '../controllers/upload.controller.js';

const router = Router();

router.post('/upload-design', upload.single('designFile'), uploadDesign);

export default router;
