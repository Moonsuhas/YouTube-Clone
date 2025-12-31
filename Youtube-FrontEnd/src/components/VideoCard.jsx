/**
 * Video Card Component
 * ----------------------------------------------------------
 * Renders an individual video preview card used on the Home page.
 * Hover effects added ONLY for UI (no logic change).
 */

import React from "react";
import { Link } from "react-router-dom";

/**
 * Returns fallback avatar if uploader avatar is missing
 */
const getAvatar = (channelId) => {
  const avatars = {
    channel01: "https://i.pravatar.cc/150?img=5",
    channel02: "https://i.pravatar.cc/150?img=11",
    channel03: "https://i.pravatar.cc/150?img=15",
    channel04: "https://i.pravatar.cc/150?img=20",
    channel05: "https://i.pravatar.cc/150?img=25",
    channel06: "https://i.pravatar.cc/150?img=30",
  };
  return avatars[channelId] || "https://i.pravatar.cc/150?img=1";
};

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video.videoId}`} className="block group">
      <div className="w-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-xl">
        {/* Thumbnail */}
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-200">
          <img
            src={
              video.thumbnailUrl && video.thumbnailUrl.trim() !== ""
                ? video.thumbnailUrl
                : "https://via.placeholder.com/320x180?text=No+Thumbnail"
            }
            alt={video.title}
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Video Info */}
        <div className="flex mt-3 gap-3 px-1 pb-2">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm shrink-0">
            <img
              src={
                video.uploaderAvatar && video.uploaderAvatar.trim() !== ""
                  ? video.uploaderAvatar
                  : getAvatar(video.channelId)
              }
              alt={video.uploader}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-[15px] leading-tight line-clamp-2 group-hover:text-black">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600">{video.uploader}</p>
            <p className="text-sm text-gray-500">
              {video.views?.toLocaleString()} views
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
