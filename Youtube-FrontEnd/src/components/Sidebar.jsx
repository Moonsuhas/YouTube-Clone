/**
 * Sidebar Component
 * - Scrollable
 * - YouTube-like items
 * - Home always works
 */

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 h-[calc(100vh-56px)] overflow-y-auto bg-white border-r">
      <ul className="p-3 space-y-2 text-sm">

        <Link to="/"><li className="hover:bg-gray-100 p-2 rounded">🏠 Home</li></Link>
        <Link to="/shorts"><li className="hover:bg-gray-100 p-2 rounded">🎬 Shorts</li></Link>
        <Link to="/subscriptions"><li className="hover:bg-gray-100 p-2 rounded">📺 Subscriptions</li></Link>

        <hr />

        <Link to="/"><li className="hover:bg-gray-100 p-2 rounded">🎵 Music</li></Link>
        <Link to="/"><li className="hover:bg-gray-100 p-2 rounded">📰 News</li></Link>
        <Link to="/"><li className="hover:bg-gray-100 p-2 rounded">🎮 Gaming</li></Link>
        <Link to="/"><li className="hover:bg-gray-100 p-2 rounded">🎙 Podcasts</li></Link>

        <hr />

        <Link to="/library"><li className="hover:bg-gray-100 p-2 rounded">📚 Library</li></Link>
        <li className="hover:bg-gray-100 p-2 rounded">⏱ History</li>
        <li className="hover:bg-gray-100 p-2 rounded">⬇ Downloads</li>
        <li className="hover:bg-gray-100 p-2 rounded">👍 Liked videos</li>

      </ul>
    </aside>
  );
};

export default Sidebar;
