import User from "../models/User.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * =======================================================
 * GET LOGGED-IN USER
 * =======================================================
 * Returns authenticated user's profile
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =======================================================
 * UPDATE USER DETAILS
 * =======================================================
 * Allowed fields:
 * - username
 * - email
 * - channelDescription
 */
export const updateUser = async (req, res) => {
  try {
    const updates = {};

    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.channelDescription)
      updates.channelDescription = req.body.channelDescription;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =======================================================
 * UPDATE BANNER IMAGE
 * =======================================================
 */
export const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "youtube_clone/banners",
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { banner: result.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Banner updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =======================================================
 * UPDATE AVATAR
 * =======================================================
 */
export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "youtube_clone/avatars",
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Avatar updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
