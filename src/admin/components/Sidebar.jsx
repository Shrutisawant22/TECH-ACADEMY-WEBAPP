// ==========================
// 📁 src/admin/components/Sidebar.jsx (ADVANCED)
// ==========================
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { name: "Users", icon: "👤", path: "/admin/users" },
    { name: "Courses", icon: "📚", path: "/admin/courses" },
    { name: "Enrollments", icon: "🧾", path: "/admin/enrollments" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      {/* OVERLAY (MOBILE) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.div
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* HEADER */}
        <div className="top">
          <h2>{collapsed ? "TA" : "Tech Admin"}</h2>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        {/* MENU */}
        <div className="menu">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "link active" : "link"
              }
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* FOOTER */}
        <div className="bottom">
          <button onClick={handleLogout}>
            <span>🚪</span>
            {!collapsed && "Logout"}
          </button>
        </div>

        {/* STYLES */}
        <style>{`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 9;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100vh;
            background: #0f172a;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 15px;
            z-index: 10;
          }

          .collapsed {
            width: 80px;
          }

          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .top h2 {
            font-size: 18px;
          }

          .top button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
          }

          .menu {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border-radius: 10px;
            color: #cbd5f5;
            text-decoration: none;
            transition: 0.2s;
          }

          .link:hover {
            background: #1e293b;
          }

          .active {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
          }

          .icon {
            font-size: 18px;
          }

          .bottom {
            margin-top: auto;
          }

          .bottom button {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: none;
            background: #ef4444;
            color: white;
            cursor: pointer;
          }
        `}</style>
      </motion.div>
    </>
  );
}