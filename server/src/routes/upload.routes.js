// import { Router } from "express";

// import { uploadDesign } from "../controllers/upload.controller.js";
// import { upload } from "../config/multer.config.js";

// const router = Router();

// router.post("/upload-design", upload.single("designFile"), uploadDesign);

// export default router;

import express from "express";
import upload from "../config/multer.config.js";
import { uploadImage } from "../controllers/upload.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/upload-design",

  upload.single("designFile"),
  uploadImage,
);

export default router;
