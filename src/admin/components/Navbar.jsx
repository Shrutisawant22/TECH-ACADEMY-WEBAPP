// ==========================
// 📁 src/admin/components/Navbar.jsx (ADVANCED)
// ==========================
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  title = "Admin Panel",
  admin = { name: "Admin", email: "" },
  onToggleSidebar
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  // ==========================
  // 🔔 MOCK NOTIFICATIONS
  // ==========================
  const notifications = [
    { id: 1, text: "New enrollment received", time: "2m ago" },
    { id: 2, text: "New user registered", time: "10m ago" },
    { id: 3, text: "Course updated", time: "1h ago" }
  ];

  // ==========================
  // 🧠 CLICK OUTSIDE HANDLER
  // ==========================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==========================
  // 🌙 DARK MODE TOGGLE
  // ==========================
  const toggleTheme = () => {
    setDark((prev) => !prev);
    document.body.classList.toggle("light-mode");
  };

  // ==========================
  // 🔓 LOGOUT
  // ==========================
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <h2>{title}</h2>
      </div>

      {/* RIGHT */}
      <div className="right">

        {/* SEARCH */}
        <div className="search">
          <input placeholder="Search..." />
        </div>

        {/* DARK MODE */}
        <button className="icon-btn" onClick={toggleTheme}>
          {dark ? "🌙" : "☀️"}
        </button>

        {/* NOTIFICATIONS */}
        <div className="notif" ref={notifRef}>
          <button
            className="icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            🔔
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h4>Notifications</h4>
                {notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    <p>{n.text}</p>
                    <span>{n.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE */}
        <div className="profile" ref={menuRef}>
          <img
            src="https://i.pravatar.cc/100"
            alt=""
            onClick={() => setOpen(!open)}
          />

          <AnimatePresence>
            {open && (
              <motion.div
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="name">{admin.name}</p>
                <p className="email">{admin.email}</p>

                <button onClick={() => navigate("/admin/profile")}>
                  Profile
                </button>

                <button onClick={handleLogout} className="logout">
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .navbar {
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .menu-btn {
          background: none;
          border: none;
          font-size: 20px;
          color: white;
          cursor: pointer;
        }

        .right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .search input {
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background: #1e293b;
          color: white;
        }

        .icon-btn {
          background: #1e293b;
          border: none;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
        }

        .profile img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
        }

        .dropdown {
          position: absolute;
          right: 20px;
          top: 70px;
          background: #0f172a;
          padding: 15px;
          border-radius: 12px;
          width: 200px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          z-index: 10;
        }

        .dropdown button {
          width: 100%;
          margin-top: 10px;
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: #1e293b;
          color: white;
          cursor: pointer;
        }

        .logout {
          background: #ef4444 !important;
        }

        .notif-item {
          padding: 8px 0;
          border-bottom: 1px solid #1e293b;
        }

        .notif-item span {
          font-size: 12px;
          color: #94a3b8;
        }

        .name {
          font-weight: bold;
        }

        .email {
          font-size: 12px;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}