import Video from "../models/Video.model.js";

/**
 * ============================================
 * ADD COMMENT TO A VIDEO
 * ============================================
 * Adds a new comment to a specific video.
 * Only logged-in users can comment.
 */
export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Find video by MongoDB _id
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Create comment object
    const newComment = {
      user: req.user.id, // from JWT middleware
      text,
    };

    // Push comment into comments array
    video.comments.push(newComment);
    await video.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

/**
 * =======================================================
 * EDIT COMMENT
 * =======================================================
 * Allows a user to edit ONLY their own comment.
 */
export const editComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Updated text is required" });
    }

    // Find video
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find comment by _id
    const comment = video.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ownership check
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can edit only your comment" });
    }

    // Update comment
    comment.text = text;
    comment.editedAt = new Date();

    await video.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update comment",
      error: error.message,
    });
  }
};

/**
 * =======================================================
 * DELETE COMMENT
 * =======================================================
 * Allows a user to delete ONLY their own comment.
 */
export const deleteComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;

    // Find video
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find comment
    const comment = video.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ownership check
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your comment" });
    }

    // Remove comment
    comment.deleteOne();
    await video.save();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};
