/**
 * Trending Component
 * ----------------------------------------------------------
 * This is a demo page that represents the "Trending" section
 * similar to YouTube's trending videos page.
 * 
 * Features:
 * - Displays a heading for trending videos
 * - Optional description below the heading
 * - Can be extended later to fetch actual trending videos
 */
const Trending = () => {
  return (
    <div className="p-6 text-xl font-semibold">
      🔥 Trending Videos
      <p className="text-gray-600 mt-2">
        Showing currently trending videos (demo page).
      </p>
    </div>
  );
};
export default Trending;
