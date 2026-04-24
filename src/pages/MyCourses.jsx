import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH COURSES
  // ==========================
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/enrollments/my-courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const data = await res.json();

        const enriched = (data.data || []).map((item) => ({
          ...item.course,
          enrollmentId: item._id,
          progress: item.progress || 0
        }));

        setCourses(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  // ==========================
  // DASHBOARD STATS
  // ==========================
  const stats = useMemo(() => {
    const total = courses.length;
    const completed = courses.filter((c) => c.progress === 100).length;
    const avg =
      total === 0
        ? 0
        : Math.floor(
            courses.reduce((sum, c) => sum + c.progress, 0) / total
          );

    return { total, completed, avg };
  }, [courses]);

  // ==========================
  // UPDATE PROGRESS
  // ==========================
  const updateProgress = async (id, current) => {
    const newProgress = Math.min(current + 10, 100);

    try {
      await fetch(
        `http://localhost:5000/api/enrollments/${id}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ progress: newProgress })
        }
      );

      setCourses((prev) =>
        prev.map((c) =>
          c.enrollmentId === id ? { ...c, progress: newProgress } : c
        )
      );
    } catch {
      alert("Failed ❌");
    }
  };

  // ==========================
  // REMOVE COURSE
  // ==========================
  const removeCourse = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/enrollments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCourses((prev) => prev.filter((c) => c.enrollmentId !== id));
    } catch {
      alert("Failed ❌");
    }
  };

  // ==========================
  // SKELETON
  // ==========================
  const Skeleton = () => (
    <div className="card skeleton">
      <div className="thumb shimmer"></div>
      <div className="content">
        <div className="line shimmer"></div>
        <div className="line small shimmer"></div>
      </div>
    </div>
  );

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <h1>🎓 My Learning Dashboard</h1>
        <p>Track your progress and keep learning 🚀</p>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Courses</p>
        </div>

        <div className="stat-card">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h3>{stats.avg}%</h3>
          <p>Avg Progress</p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid">
        {loading
          ? Array(6).fill().map((_, i) => <Skeleton key={i} />)
          : courses.map((course) => (
              <motion.div
                key={course._id}
                className="card"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="thumb">
                  <img src={course.thumbnail} alt="" />
                  <span className="badge">
                    {course.progress === 100
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>

                <div className="content">
                  <h3>{course.title}</h3>
                  <p>{course.description.substring(0, 80)}...</p>

                  {/* PROGRESS */}
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="progress-text">
                    {course.progress}% completed
                  </div>

                  {/* ACTIONS */}
                  <div className="actions">
                    <button
                      className="btn primary"
                      onClick={() =>
                        updateProgress(
                          course.enrollmentId,
                          course.progress
                        )
                      }
                    >
                      Continue →
                    </button>

                    <button
                      className="btn danger"
                      onClick={() =>
                        removeCourse(course.enrollmentId)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>

      {/* EMPTY */}
      {!loading && courses.length === 0 && (
        <div className="empty">No courses yet 🚀</div>
      )}

      {/* STYLES */}
      <style>{`
        .page {
          padding: 30px;
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #020617);
          color: white;
        }

        .header h1 {
          font-size: 38px;
        }

        .header p {
          color: #94a3b8;
        }

        .stats {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }

        .stat-card {
          flex: 1;
          padding: 20px;
          border-radius: 15px;
          background: rgba(255,255,255,0.05);
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .card {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
        }

        .thumb {
          position: relative;
        }

        .thumb img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #22c55e;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 12px;
        }

        .content {
          padding: 15px;
        }

        .progress-bar {
          height: 8px;
          background: #1e293b;
          border-radius: 10px;
          margin-top: 10px;
        }

        .progress {
          height: 100%;
          background: linear-gradient(90deg,#22c55e,#4ade80);
        }

        .progress-text {
          font-size: 12px;
          margin-top: 5px;
          color: #94a3b8;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .btn {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }

        .primary {
          background: #6366f1;
          color: white;
        }

        .danger {
          background: #ef4444;
          color: white;
        }

        .empty {
          text-align: center;
          margin-top: 60px;
        }

        /* skeleton */
        .skeleton .thumb {
          height: 160px;
          background: #1e293b;
        }

        .line {
          height: 15px;
          margin: 10px 0;
          border-radius: 6px;
        }

        .small {
          width: 60%;
        }

        .shimmer {
          background: linear-gradient(90deg,#1e293b 25%,#334155 50%,#1e293b 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}