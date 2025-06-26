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
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("muhurthamUser");
    setUser(null);
    navigate("/");
  };

  const handleGoToChat = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:7000/api/chat/mutual/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

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
      <Link to="/home" className="text-2xl font-bold">Muhurtham ❤️</Link>

      {/* Desktop Links */}
      <div className="gap-4 items-center max-sm:hidden flex">
        {!user ? (
          <>
            <Link to="/register" className="hover:text-warmPeach">Register</Link>
            <Link to="/" className="hover:text-warmPeach">Login</Link>
          </>
        ) : (
          <>
            {user.role === "admin" ? (
              <Link to="/admin" className="hover:text-warmPeach">Admin Panel</Link>
            ) : (
              <>
                <Link to="/matches" className="hover:text-warmPeach">Matches</Link>
                <Link to="/interests" className="hover:text-warmPeach">Interests</Link>
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

      {/* Mobile Burger */}
      <div className="sm:hidden relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-10 bg-white text-deepPlum rounded shadow-lg p-4 w-48 flex flex-col gap-3 z-50">
            {!user ? (
              <>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                <Link to="/" onClick={() => setMenuOpen(false)}>Login</Link>
              </>
            ) : (
              <>
                {user.role === "admin" ? (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                ) : (
                  <>
                    <Link to="/matches" onClick={() => setMenuOpen(false)}>Matches</Link>
                    <Link to="/interests" onClick={() => setMenuOpen(false)}>Interests</Link>
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
                <button onClick={() => { navigate("/profile"); setMenuOpen(false); }}>
                  Profile
                </button>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}>
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
