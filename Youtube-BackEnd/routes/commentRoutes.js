import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  addComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * ======================================================
 * COMMENT ROUTES
 * Handles adding, editing, and deleting comments on videos
 * ======================================================
 */

/**
 * @route   POST /api/comments/:videoId
 * @desc    Add a new comment to a specific video
 * @access  Public (Frontend must provide userId, username, avatar)
 */
router.post("/:videoId", addComment);

/**
 * @route   PUT /api/comments/:videoId/comment/:commentId
 * @desc    Edit an existing comment
 * @access  Private (Only the comment owner, JWT required)
 */
router.put("/:videoId/comment/:commentId", auth, editComment);

/**
 * @route   DELETE /api/comments/:videoId/comment/:commentId
 * @desc    Delete a comment
 * @access  Private (Only the comment owner, JWT required)
 */
router.delete("/:videoId/comment/:commentId", auth, deleteComment);

export default router;
