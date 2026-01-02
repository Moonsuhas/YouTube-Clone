/**
 * Navbar Component
 * - Hamburger
 * - Search
 * - Mic (UI only)
 * - Login / User profile
 */



import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineSearch, AiOutlineAudio } from "react-icons/ai";
import { MdVideoCall, MdNotificationsNone } from "react-icons/md";
import { useState, useEffect } from "react";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [user, setUser] = useState(null);

  // ===== MIC (VOICE SEARCH) SETUP =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition
  ? new SpeechRecognition()
  : null;


  // useEffect(() => {
  //   const u = localStorage.getItem("user");
  //   if (u) setUser(JSON.parse(u));
  // }, []);

useEffect(() => {
  const syncUser = () => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  };

  syncUser();
  window.addEventListener("storage", syncUser);

  return () => window.removeEventListener("storage", syncUser);
}, []);





  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };


  // ===== START VOICE SEARCH =====
const startVoiceSearch = () => {
  if (!recognition) {
    alert("Voice search not supported. Use Chrome.");
    return;
  }

  recognition.lang = "en-US"; // English
  recognition.start();

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    setSearch(voiceText);
    navigate(`/?search=${voiceText}`);
  };

  recognition.onerror = () => {
    alert("Mic error. Please allow microphone permission.");
  };
};




  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between px-4 py-2">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <HiOutlineMenu size={24} />
          </button>

          <Link to="/">
            <img
              src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
              className="h-9"
              alt="YouTube"
            />
          </Link>
        </div>

        {/* CENTER SEARCH */}
        <div className="hidden md:flex items-center w-[45%] gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full outline-none"
          />

          <button
            onClick={() => navigate(`/?search=${search}`)}
            className="px-5 py-2 bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200"
          >
            <AiOutlineSearch size={20} />
          </button>

          {/* MIC (UI ONLY) */}
          {/* <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <AiOutlineAudio size={20} />
          </button> */}
          <button
  onClick={startVoiceSearch}
  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
  title="Search with voice"
>
  <AiOutlineAudio size={20} />
</button>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/upload">
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <MdVideoCall size={26} />
                </button>
              </Link>

              <button className="p-2 rounded-full hover:bg-gray-200">
                <MdNotificationsNone size={26} />
              </button>

             <Link to="/channel">
                <img
                  src={user.avatar || "https://i.pravatar.cc/100"}
                  className="w-8 h-8 rounded-full"
                  alt="profile"
                />
              </Link>  

            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
