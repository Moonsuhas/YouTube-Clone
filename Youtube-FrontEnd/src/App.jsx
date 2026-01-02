/**
 * Application Shell
 * --------------------------------------
 * - Controls Sidebar open / close
 * - Navbar + Sidebar like YouTube
 * - DOES NOT TOUCH Home / Watch / Audio
 * ======================================
 */

/**
 * App Layout
 * - Navbar on top
 * - Sidebar toggle using hamburger
 * - Main content using Outlet
 */

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </header>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar />}

        {/* Page Content */}
        <main className="flex-1 pt-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
