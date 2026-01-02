/**
 * ============================================================
 * Main Entry Point of React App
 * ============================================================
 * - Creates React root
 * - Sets up routing using React Router
 * - Uses ProtectedRoute for secured pages
 * - ONLY REQUIRED ROUTES ADDED (No removals)
 */

import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Pages & Components
import Home from "./components/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Watch from "./pages/Watch.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Upload from "./pages/Upload.jsx";
import Channel from "./pages/Channel.jsx";
import ProfileCustomize from "./pages/ProfileCustomize.jsx";
import ComingSoon from "./pages/ComingSoon";

/**
 * Route Configuration
 * --------------------------------------------
 * App is the root layout 
 * Public routes: Home, Register, Login, Watch
 * Protected routes: Upload, Channel
 * Additional YouTube-like routes use ComingSoon
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      // Authentication
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      // Watch video (PUBLIC – DO NOT TOUCH)
      { path: "watch/:id", element: <Watch /> },

      // Protected pages
      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        ),
      },
      {
        path: "channel",
        element: (
          <ProtectedRoute>
            <Channel />
          </ProtectedRoute>
        ),
      },

      // Profile redirects
      { path: "profile", element: <Navigate to="/channel" replace /> },
      { path: "profile/customize", element: <ProfileCustomize /> },

      // YouTube-like pages (SAFE placeholders)
      { path: "trending", element: <ComingSoon title="Trending" /> },
      { path: "shorts", element: <ComingSoon title="Shorts" /> },
      { path: "subscriptions", element: <ComingSoon title="Subscriptions" /> },
      { path: "library", element: <ComingSoon title="Library" /> },
      { path: "music", element: <ComingSoon title="Music" /> },
      { path: "news", element: <ComingSoon title="News" /> },
      { path: "gaming", element: <ComingSoon title="Gaming" /> },
      { path: "sports", element: <ComingSoon title="Sports" /> },
      { path: "live", element: <ComingSoon title="Live" /> },
    ],
  },
]);

// Render app
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
