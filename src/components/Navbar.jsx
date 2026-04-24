import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    if (newTheme) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <>
      <style>{`
        body.dark-mode {
          background: #121212;
          color: white;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 25px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          position: relative;
          transition: 0.3s;
        }

        .nav-links a:hover {
          opacity: 0.7;
        }

        .active::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 2px;
          background: white;
        }

        .toggle-btn {
          cursor: pointer;
          font-size: 18px;
        }

        .logout-btn {
          background: #ff4d4f;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout-btn:hover {
          transform: scale(1.05);
        }

        .hamburger {
          display: none;
          cursor: pointer;
          font-size: 22px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 60px;
            right: 0;
            background: #667eea;
            flex-direction: column;
            width: 200px;
            padding: 20px;
            transform: translateX(${menuOpen ? "0" : "100%"});
            transition: 0.3s;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>

      <div className="navbar">
        <div className="logo" onClick={() => navigate("/courses")}>
          Tech Academy
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className="nav-links">
          <Link
            to="/courses"
            className={location.pathname === "/courses" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>

          <Link
            to="/my-courses"
            className={location.pathname === "/my-courses" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            My Courses
          </Link>

          <span className="toggle-btn" onClick={toggleTheme}>
            {dark ? "☀️" : "🌙"}
          </span>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}