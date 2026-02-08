import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

const prisma = new PrismaClient();

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // if (!req.user?.id) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // 1. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // 2. Save metadata to Postgres
    const image = await prisma.image.create({
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
        // ownerId: req.user.id,
        context: "profile",
      },
    });

    // 3. Delete local file
    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      imageUrl: image.imageUrl,
      publicId: image.publicId,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: err.message });
  }
};
