// ==========================
// 📁 src/admin/components/StatCard.jsx (ADVANCED)
// ==========================
import React from "react";
import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon = "📊",
  change = 0,
  color = "indigo",
  loading = false,
  onClick
}) {
  const isPositive = change >= 0;

  return (
    <motion.div
      className={`card ${color}`}
      whileHover={{ scale: 1.04 }}
      onClick={onClick}
    >
      {/* ICON */}
      <div className="icon">{icon}</div>

      {/* CONTENT */}
      <div className="content">
        {loading ? (
          <>
            <div className="skeleton title"></div>
            <div className="skeleton value"></div>
          </>
        ) : (
          <>
            <p className="title">{title}</p>
            <h2>{value}</h2>

            <div className={`change ${isPositive ? "up" : "down"}`}>
              {isPositive ? "▲" : "▼"} {Math.abs(change)}%
            </div>
          </>
        )}
      </div>

      {/* GLOW EFFECT */}
      <div className="glow"></div>

      {/* STYLES */}
      <style>{`
        .card {
          position: relative;
          padding: 20px;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          gap: 15px;
          align-items: center;
          cursor: pointer;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          transition: 0.3s;
        }

        .card:hover {
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }

        .icon {
          font-size: 28px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.08);
        }

        .content {
          flex: 1;
        }

        .title {
          font-size: 14px;
          color: #94a3b8;
        }

        h2 {
          font-size: 26px;
          margin-top: 5px;
        }

        .change {
          margin-top: 6px;
          font-size: 13px;
          font-weight: bold;
        }

        .up {
          color: #22c55e;
        }

        .down {
          color: #ef4444;
        }

        /* COLORS */
        .indigo .glow {
          background: radial-gradient(circle, #6366f1, transparent);
        }

        .green .glow {
          background: radial-gradient(circle, #22c55e, transparent);
        }

        .red .glow {
          background: radial-gradient(circle, #ef4444, transparent);
        }

        .blue .glow {
          background: radial-gradient(circle, #3b82f6, transparent);
        }

        .glow {
          position: absolute;
          width: 200px;
          height: 200px;
          top: -50px;
          right: -50px;
          opacity: 0.2;
          filter: blur(60px);
        }

        /* SKELETON */
        .skeleton {
          background: linear-gradient(
            90deg,
            #1e293b 25%,
            #334155 50%,
            #1e293b 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }

        .title {
          width: 80px;
          height: 12px;
        }

        .value {
          width: 100px;
          height: 20px;
          margin-top: 10px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </motion.div>
  );
}