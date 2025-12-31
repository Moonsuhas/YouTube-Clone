import Video from "../models/Video.model.js";
import User from "../models/User.model.js";
import { v4 as uuidv4 } from "uuid";

/**
 * ============================================================
 * Utility: Convert YouTube links or direct video URLs
 * Returns an object with embed link + thumbnail
 * ============================================================
 */
function formatVideoLink(url) {
  if (!url) return { videoUrl: "", thumbnailUrl: "" };
  const trimmedUrl = url.trim();

  // YouTube watch?v=ID
  const watchMatch = trimmedUrl.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    const id = watchMatch[1];
    return {
      videoUrl: `https://www.youtube.com/embed/${id}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    };
  }

  // YouTube short link youtu.be/ID
  const shortMatch = trimmedUrl.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch) {
    const id = shortMatch[1];
    return {
      videoUrl: `https://www.youtube.com/embed/${id}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    };
  }

  // YouTube embed format
  const embedMatch = trimmedUrl.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch) {
    return {
      videoUrl: trimmedUrl,
      thumbnailUrl: `https://i.ytimg.com/vi/${embedMatch[1]}/maxresdefault.jpg`,
    };
  }

  // Direct video file
  if (/\.(mp4|webm|ogg|mov|mkv)$/i.test(trimmedUrl)) {
    return { videoUrl: trimmedUrl, thumbnailUrl: "" };
  }

  return { videoUrl: trimmedUrl, thumbnailUrl: "" };
}

/**
 * ============================================================
 * Upload a new video
 * ============================================================
 */
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, videoUrl } = req.body;
    const user = req.user;

    if (!videoUrl) {
      return res.status(400).json({ message: "Video URL is required." });
    }

    const { videoUrl: embedUrl, thumbnailUrl } = formatVideoLink(videoUrl);

    const newVideo = new Video({
      videoId: uuidv4(),
      title,
      description,
      category,
      channel: user.id, // ✅ FIXED
      videoUrl: embedUrl,
      thumbnailUrl,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error while uploading video" });
  }
};


/**
 * ============================================================
 * Get all videos (newest first)
 * ============================================================
 */
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .populate("channel", "username avatar"); // populate uploader info

    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Could not fetch videos" });
  }
};

/**
 * ============================================================
 * Get single video by videoId
 * ============================================================
 */
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id })
      .populate("channel", "username avatar");

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================================================
 * Get suggested videos by category (exclude current video)
 * ============================================================
 */
export const getSuggestedVideos = async (req, res) => {
  try {
    const { category, excludeId } = req.params;
    const videos = await Video.find({ category, videoId: { $ne: excludeId } })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("channel", "username avatar");

    res.json(videos);
  } catch (error) {
    console.error("Error fetching suggested videos:", error);
    res.status(500).json({ message: "Could not fetch suggested videos" });
  }
};

/**
 * ============================================================
 * Increment view count by 1
 * ============================================================
 */
export const addView = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { videoId: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.json(video);
  } catch (error) {
    console.error("Error adding view:", error);
    res.status(500).json({ message: "Could not add view" });
  }
};

/**
 * ============================================================
 * Toggle like on video
 * ============================================================
 */
export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const videoId = req.params.videoId || req.params.id;

    if (!videoId) return res.status(400).json({ message: "Video ID missing" });

    const video = await Video.findOne({ videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes = video.dislikes.filter(id => !id.equals(userId));

    if (video.likes.some(id => id.equals(userId))) {
      video.likes = video.likes.filter(id => !id.equals(userId));
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res.json(video);
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================================================
 * Toggle dislike on video
 * ============================================================
 */
export const toggleDislike = async (req, res) => {
  try {
    const userId = req.user._id;
    const videoId = req.params.videoId || req.params.id;

    if (!videoId) return res.status(400).json({ message: "Video ID missing" });

    const video = await Video.findOne({ videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes = video.likes.filter(id => !id.equals(userId));

    if (video.dislikes.some(id => id.equals(userId))) {
      video.dislikes = video.dislikes.filter(id => !id.equals(userId));
    } else {
      video.dislikes.push(userId);
    }

    await video.save();
    res.json(video);
  } catch (error) {
    console.error("Error toggling dislike:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================================================
 * Get videos of logged-in user (channel)
 * ============================================================
 */
export const getChannelVideos = async (req, res) => {
  try {
    const userId = req.user._id;
    const videos = await Video.find({ channel: userId })
      .sort({ createdAt: -1 })
      .populate("channel", "username avatar");

    res.json(videos);
  } catch (error) {
    console.error("Error fetching channel videos:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================================================
 * Update video details (only by owner)
 * ============================================================
 */
export const updateVideo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { videoId } = req.params;
    const { title, description, category } = req.body;

    const video = await Video.findOne({ videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!video.channel.equals(userId)) return res.status(403).json({ message: "Not authorized" });

    if (title) video.title = title;
    if (description !== undefined) video.description = description;
    if (category) video.category = category;

    await video.save();
    res.json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Could not update video" });
  }
};

/**
 * ============================================================
 * Delete video (only by owner)
 * ============================================================
 */
export const deleteVideo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { videoId } = req.params;

    const video = await Video.findOne({ videoId });
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!video.channel.equals(userId)) return res.status(403).json({ message: "Not authorized" });

    await Video.deleteOne({ videoId });
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Could not delete video" });
  }
};
