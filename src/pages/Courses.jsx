// ==========================
// 📁 UPDATED Courses.jsx (TOKEN + ERROR HANDLING FIXED)
// ==========================
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const navigate = useNavigate();

  // ==========================
  // FETCH COURSES (FIXED)
  // ==========================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/courses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
          }
        });

        // 🔥 HANDLE TOKEN EXPIRED / INVALID
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch courses");
        }

        setCourses(data.data || []);
        setFiltered(data.data || []);

      } catch (err) {
        console.error("Courses Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  // ==========================
  // DEBOUNCE SEARCH
  // ==========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ==========================
  // FILTER LOGIC
  // ==========================
  useEffect(() => {
    let temp = [...courses];

    if (debouncedSearch) {
      temp = temp.filter((c) =>
        c.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category !== "All") {
      temp = temp.filter((c) => c.category === category);
    }

    if (level !== "All") {
      temp = temp.filter((c) => c.level === level);
    }

    setFiltered(temp);
  }, [debouncedSearch, category, level, courses]);

  // ==========================
  // UNIQUE CATEGORIES
  // ==========================
  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category));
    return ["All", ...set];
  }, [courses]);

  // ==========================
  // SKELETON
  // ==========================
  const Skeleton = () => (
    <div className="card skeleton">
      <div className="thumb shimmer"></div>
      <div className="content">
        <div className="shimmer line"></div>
        <div className="shimmer line small"></div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="header">
        <h1>🚀 Explore Courses</h1>
        <p>Learn in-demand skills from industry experts</p>
      </div>

      <div className="top-bar">
        <input
          placeholder="🔍 Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div className="grid">
        {loading
          ? Array(6).fill().map((_, i) => <Skeleton key={i} />)
          : filtered.map((course) => (
              <motion.div
                key={course._id}
                className="card"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="thumb">
                  <img src={course.thumbnail} alt="" />
                  <span className="badge">{course.level}</span>
                </div>

                <div className="content">
                  <h3>{course.title}</h3>
                  <p>{course.description?.substring(0, 80)}...</p>

                  <div className="meta">
                    ⭐ {course.rating || 4.5} •{" "}
                    {course.studentsEnrolled || 1200}+ students
                  </div>

                  <div className="footer">
                    <span className="price">₹{course.price || 499}</span>

                    <button
                      onClick={() =>
                        navigate(`/checkout/${course._id}`)
                      }
                    >
                      Enroll →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="empty">No courses found 😢</div>
      )}

      <style>{`
        .page {
          padding: 30px;
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #020617);
          color: white;
          font-family: system-ui;
        }

        .header h1 {
          font-size: 40px;
        }

        .header p {
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .top-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .top-bar input,
        .top-bar select {
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .card {
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(145deg, #0f172a, #020617);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }

        .thumb img {
          width: 100%;
          height: 170px;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #6366f1;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 12px;
        }

        .content {
          padding: 15px;
        }

        .meta {
          font-size: 12px;
          margin: 8px 0;
          color: #64748b;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-weight: bold;
          color: #22c55e;
        }

        .footer button {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          padding: 8px 14px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }

        .empty {
          text-align: center;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
}