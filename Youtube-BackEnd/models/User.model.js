import mongoose from "mongoose";

/**
 * User Schema
 * This schema stores all registered users of the YouTube Clone app.
 * Each user can create channels, upload videos, and post comments.
 */
const userSchema = new mongoose.Schema(
  {
    // Display name of the user
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // Email used for login (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Encrypted password (hashed using bcrypt)
    password: {
      type: String,
      required: true,
    },

    // Profile picture
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150",
    },

    // Optional banner image for channel/profile
    banner: {
      type: String,
      default: "",
    },

    // About section for user's channel
    channelDescription: {
      type: String,
      default: "",
    },

    // Channels owned by the user (reference based)
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],

    // Small originality feature: track liked videos
    likedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Export User model
export default mongoose.model("User", userSchema);
