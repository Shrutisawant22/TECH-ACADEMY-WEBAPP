// ==========================
// 📁 src/admin/pages/Dashboard.jsx (PREMIUM UI / PRODUCTION LEVEL)
// ==========================
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  // ==========================
  // 📡 FETCH DATA
  // ==========================
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setStats(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const completionRate = stats?.totalEnrollments
    ? ((stats.completedCourses / stats.totalEnrollments) * 100).toFixed(1)
    : 0;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <motion.div
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>📊 Admin Dashboard</h1>
        <p>Track performance, growth & revenue in real-time</p>
      </motion.div>

      {/* STATS */}
      <div className="stats-grid">
        <StatCard title="Users" value={stats?.totalUsers || 0} icon="👤" color="indigo" loading={loading} />
        <StatCard title="Courses" value={stats?.totalCourses || 0} icon="📚" color="blue" loading={loading} />
        <StatCard title="Enrollments" value={stats?.totalEnrollments || 0} icon="🧾" color="green" loading={loading} />
        <StatCard title="Revenue" value={`₹${stats?.totalRevenue || 0}`} icon="💰" color="purple" loading={loading} />
      </div>

      {/* GRID */}
      <div className="grid">

        {/* COMPLETION CARD */}
        <motion.div
          className="card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>🎯 Completion Rate</h3>

          <div className="progress-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <div className="progress-info">
            <span>{completionRate}% completed</span>
            <span>
              {stats?.completedCourses || 0} / {stats?.totalEnrollments || 0}
            </span>
          </div>
        </motion.div>

        {/* ACTIVITY */}
        <motion.div
          className="card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>⚡ Recent Activity</h3>

          <ul className="activity">
            <li>👤 New user joined</li>
            <li>📚 Course published</li>
            <li>💳 Payment received</li>
            <li>🧾 Enrollment completed</li>
          </ul>
        </motion.div>

        {/* PERFORMANCE */}
        <motion.div
          className="card gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>🚀 Platform Health</h3>
          <p>All systems running smoothly</p>
          <span className="status">● Operational</span>
        </motion.div>

      </div>

      {/* STYLES */}
      <style>{`
        .dashboard {
          padding: 20px;
          color: white;
        }

        .header h1 {
          font-size: 32px;
          margin-bottom: 5px;
        }

        .header p {
          color: #94a3b8;
          margin-bottom: 25px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .grid {
          margin-top: 25px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .card {
          padding: 20px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .gradient {
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          box-shadow: 0 10px 30px rgba(99,102,241,0.5);
        }

        .progress-wrapper {
          margin-top: 15px;
          height: 10px;
          background: #1e293b;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg,#22c55e,#4ade80);
          transition: width 0.5s ease;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 13px;
          color: #94a3b8;
        }

        .activity {
          margin-top: 10px;
          list-style: none;
          padding: 0;
        }

        .activity li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .status {
          margin-top: 10px;
          display: inline-block;
          color: #22c55e;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}