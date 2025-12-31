import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * ============================================================
 * MULTER DISK STORAGE CONFIGURATION
 * Temporarily stores uploaded images (avatar/banner) before
 * uploading them to Cloudinary.
 *
 * Features:
 *  - Ensures temporary directory exists
 *  - Accepts only image files
 *  - Generates unique filenames
 *  - Limits file size to 10MB
 * ============================================================
 */

// Temporary uploads directory
const tempDir = "temp_uploads/";

// Create temp folder if it doesn't exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * ------------------------------------------------------------
 * Storage Engine
 * Defines where and how files are stored.
 * ------------------------------------------------------------
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // Save to temp_uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/**
 * ------------------------------------------------------------
 * File Filter
 * Only allows image types (PNG, JPG, JPEG, WEBP, GIF, etc.)
 * ------------------------------------------------------------
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

/**
 * ------------------------------------------------------------
 * Multer Export
 * Combines storage, file filter, and file size limit
 * ------------------------------------------------------------
 */
export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});
