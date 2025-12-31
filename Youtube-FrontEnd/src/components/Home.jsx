/**
 * Home Page Component
 * Displays a grid of videos fetched from the backend.
 * Supports:
 *   - Searching videos via URL query (?search=term)
 *   - Filtering videos by categories
 *
 * NOTE:
 * Only SMALL hover effects added to buttons.
 * NO logic changes.
 */
/**
 * Home Page
 * --------------------------------------------------
 * - Fetches all videos from backend
 * - Filters by:
 *    1. Search (?search=)
 *    2. Category (?category=)
 * - Same page used for Music / News / Gaming (YouTube style)
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import API_BASE_URL from "../config/api";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const Home = () => {
  const [searchParams] = useSearchParams();

  // URL params
  const searchTerm = searchParams.get("search") || "";
  const categoryFromURL = searchParams.get("category") || "All";

  // State
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);

  // Category list (YouTube-like)
  const categories = [
    "All",
    "Music",
    "News",
    "Gaming",
    "Sports",
    "Movies",
    "Podcasts",
    "Technology",
    "Education",
    "Frontend",
    "Backend",
    "AI",
  ];

  // Sync category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  // Fetch videos once
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error loading videos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Filter logic
  const filteredVideos = videos.filter((video) => {
    const matchSearch = video.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      video.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="px-4 py-4">
      {/* CATEGORY BUTTONS */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition
              ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIDEOS */}
      {loading ? (
        <Loading message="Loading videos..." />
      ) : filteredVideos.length === 0 ? (
        <p className="text-gray-500">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
