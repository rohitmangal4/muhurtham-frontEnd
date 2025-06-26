import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaComments } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("muhurthamUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setMenuOpen(false); // close menu on route change
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("muhurthamUser");
    setUser(null);
    navigate("/");
  };

  const handleGoToChat = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        "https://muhurtham-backend.onrender.com/api/chat/mutual/list",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (res.data.length > 0) {
        const firstUser = res.data[0];
        navigate(`/chat/${firstUser._id}`);
      } else {
        alert("No chats available.");
      }
    } catch (err) {
      console.error("Failed to open chat", err);
      alert("Error opening chat.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-deepPlum/95 text-white border-b border-warmPeach/35 px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/home" className="text-2xl font-bold">
        Muhurtham ❤️
      </Link>

      {/* Desktop Links */}
      <div className="hidden sm:flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/register" className="hover:text-warmPeach">
              Register
            </Link>
            <Link to="/" className="hover:text-warmPeach">
              Login
            </Link>
          </>
        ) : (
          <>
            {user.role === "admin" ? (
              <Link to="/admin" className="hover:text-warmPeach">
                Admin Panel
              </Link>
            ) : (
              <>
                <Link to="/home" className="hover:text-warmPeach">
                  Home
                </Link>
                <Link to="/matches" className="hover:text-warmPeach">
                  Matches
                </Link>
                <Link to="/interests" className="hover:text-warmPeach">
                  Interests
                </Link>
                <button
                  onClick={handleGoToChat}
                  title="Chat"
                  className="text-xl hover:text-warmPeach"
                >
                  <FaComments />
                </button>
              </>
            )}
            <button
              onClick={() => navigate("/profile")}
              className="text-2xl hover:text-warmPeach"
              title="My Profile"
            >
              <FaUserCircle />
            </button>
            <button
              onClick={handleLogout}
              className="bg-warmPeach text-black px-3 py-1 rounded hover:bg-orange-300"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Burger Icon */}
      <div className="sm:hidden z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-deepPlum text-white transform transition-transform duration-300 z-40 p-10 flex flex-col gap-8 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {!user ? (
          <>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </>
        ) : (
          <>
            {user.role === "admin" ? (
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Admin Panel
              </Link>
            ) : (
              <>
                <Link to="/home" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/matches" onClick={() => setMenuOpen(false)}>
                  Matches
                </Link>
                <Link to="/interests" onClick={() => setMenuOpen(false)}>
                  Interests
                </Link>
                <button
                  onClick={() => {
                    handleGoToChat();
                    setMenuOpen(false);
                  }}
                  className="text-left"
                >
                  Chat
                </button>
              </>
            )}
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="border border-warmPeach py-2 rounded-md hover:bg-warmPeach hover:text-black/90 hover:rounded-md"
            >
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="border border-warmPeach py-2 rounded-md hover:bg-warmPeach hover:text-black/90 hover:rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
