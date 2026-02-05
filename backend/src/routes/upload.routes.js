import { Router } from "express";

import { uploadDesign } from "../controllers/upload.controller.js";
import { upload } from "../config/multer.config.js";

const router = Router();

router.post("/upload-design", upload.single("designFile"), uploadDesign);

export default router;
