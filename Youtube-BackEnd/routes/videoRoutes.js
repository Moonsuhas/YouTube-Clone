import express from "express";
import {
  uploadVideo,
  getAllVideos,
  getVideo,
  getSuggestedVideos,
  addView,
  toggleLike,
  toggleDislike,
  getChannelVideos,
  updateVideo,
  deleteVideo
} from "../controllers/videoController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================== SAFE ROUTES ===================== */

// Upload video
router.post("/upload", auth, uploadVideo);

// Get all videos
router.get("/", getAllVideos);

// 🔥 IMPORTANT: channel MUST COME BEFORE :id
router.get("/channel", auth, getChannelVideos);

// Suggested videos
router.get("/suggested/:category/:excludeId", getSuggestedVideos);

// Get single video
router.get("/:id", getVideo);

// Add view
router.put("/view/:id", addView);

// Like / Dislike
router.put("/like/:id", auth, toggleLike);
router.put("/dislike/:id", auth, toggleDislike);

// Update & delete
router.put("/:videoId", auth, updateVideo);
router.delete("/:videoId", auth, deleteVideo);

export default router;
