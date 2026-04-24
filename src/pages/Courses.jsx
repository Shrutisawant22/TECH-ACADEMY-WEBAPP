import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const navigate = useNavigate();

  // ==========================
  // FETCH
  // ==========================
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://localhost:5000/api/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      setCourses(data.data || []);
      setFiltered(data.data || []);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  // ==========================
  // FILTER
  // ==========================
  useEffect(() => {
    let temp = [...courses];

    if (search) {
      temp = temp.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      temp = temp.filter((c) => c.category === category);
    }

    if (level !== "All") {
      temp = temp.filter((c) => c.level === level);
    }

    setFiltered(temp);
  }, [search, category, level, courses]);

  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category));
    return ["All", ...set];
  }, [courses]);

  return (
    <>
      <style>{`
        .container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #020617, #0f172a);
        }

        /* SIDEBAR */
        .sidebar {
          width: 250px;
          padding: 20px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar h3 {
          color: white;
          margin-bottom: 15px;
        }

        .filter-item {
          margin-bottom: 15px;
        }

        .select, .input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.15);
          color: white;
        }

        /* MAIN */
        .main {
          flex: 1;
          padding: 30px;
        }

        .title {
          font-size: 36px;
          color: white;
          margin-bottom: 20px;
        }

        .search-box {
          margin-bottom: 20px;
        }

        .search-box input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
          box-shadow: 0 0 15px rgba(99,102,241,0.3);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(25px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          transition: 0.4s;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.03);
        }

        .thumb img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .content {
          padding: 15px;
        }

        .content h3 {
          color: white;
        }

        .content p {
          color: #94a3b8;
          font-size: 14px;
        }

        .meta {
          font-size: 12px;
          color: #64748b;
        }

        .btn {
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .loader, .empty {
          text-align: center;
          color: white;
          margin-top: 80px;
        }
      `}</style>

      <div className="container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Filters</h3>

          <div className="filter-item">
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <select
              className="select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <h2 className="title">🚀 Explore Courses</h2>

          <div className="search-box">
            <input
              placeholder="🔍 Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loader">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="empty">No courses found 😢</div>
          ) : (
            <div className="grid">
              {filtered.map((course) => (
                <div className="card" key={course._id}>
                  <div className="thumb">
                    <img src={course.thumbnail} alt="" />
                  </div>

                  <div className="content">
                    <h3>{course.title}</h3>
                    <p>{course.description.substring(0, 90)}...</p>

                    <div className="meta">
                      ⭐ {course.rating} • 👨‍🎓 {course.studentsEnrolled}+ students
                    </div>

                    <button
                      className="btn"
                      onClick={() => navigate(`/checkout/${course._id}`)}
                    >
                      Buy Now 💳
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}