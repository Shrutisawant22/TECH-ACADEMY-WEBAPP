// ==========================
// 📁 src/admin/layout/AdminLayout.jsx (ULTRA ADVANCED)
// ==========================
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useAdminAuth from "../hooks/useAdminAuth";

export default function AdminLayout() {
  const { admin, loading } = useAdminAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN */}
      <div className={`main ${sidebarOpen ? "shift" : ""}`}>

        {/* NAVBAR */}
        <Navbar
          admin={admin?.user || { name: "Admin" }}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* PAGE CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STYLES */}
      <style>{`
        .layout {
          display: flex;
          min-height: 100vh;
          background: radial-gradient(circle at top, #020617, #0f172a);
          color: white;
        }

        .main {
          flex: 1;
          margin-left: 0;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s ease;
        }

        .shift {
          margin-left: 250px;
        }

        .content {
          padding: 25px;
          flex: 1;
          overflow-y: auto;
        }

        /* SCROLLBAR */
        .content::-webkit-scrollbar {
          width: 6px;
        }

        .content::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }

        /* LOADER */
        .loader-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #020617;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #1e293b;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .shift {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}