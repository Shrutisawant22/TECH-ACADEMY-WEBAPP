import React, { useEffect, useState } from "react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // 📡 FETCH ENROLLED COURSES
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
      }

      setLoading(false);
    };

    fetchMyCourses();
  }, []);

  // ==========================
  // 🔄 UPDATE PROGRESS (LIVE)
  // ==========================
  const updateProgress = async (enrollmentId, current) => {
    const newProgress = Math.min(current + 10, 100);

    try {
      await fetch(
        `http://localhost:5000/api/enrollments/${enrollmentId}/progress`,
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
          c.enrollmentId === enrollmentId
            ? { ...c, progress: newProgress }
            : c
        )
      );
    } catch {
      alert("Failed to update progress ❌");
    }
  };

  // ==========================
  // ❌ REMOVE COURSE
  // ==========================
  const removeCourse = async (enrollmentId) => {
    try {
      await fetch(
        `http://localhost:5000/api/enrollments/${enrollmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCourses((prev) =>
        prev.filter((c) => c.enrollmentId !== enrollmentId)
      );
    } catch {
      alert("Failed to remove ❌");
    }
  };

  return (
    <>
      <style>{`
        .container {
          padding: 40px;
          min-height: 100vh;
          background: linear-gradient(135deg, #020617, #0f172a);
        }

        .title {
          text-align: center;
          font-size: 34px;
          color: white;
          margin-bottom: 30px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.06);
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

        .progress-bar {
          margin-top: 12px;
          height: 10px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }

        .progress {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #4ade80);
          transition: width 0.4s ease;
        }

        .progress-text {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 5px;
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
          font-weight: bold;
        }

        .continue {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
        }

        .remove {
          background: linear-gradient(135deg, #ef4444, #f87171);
          color: white;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .empty, .loader {
          text-align: center;
          margin-top: 80px;
          color: white;
        }
      `}</style>

      <div className="container">
        <h2 className="title">🎓 My Learning Dashboard</h2>

        {loading ? (
          <div className="loader">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="empty">No courses enrolled 🚀</div>
        ) : (
          <div className="grid">
            {courses.map((course) => (
              <div className="card" key={course._id}>
                <div className="thumb">
                  <img src={course.thumbnail} alt="" />
                </div>

                <div className="content">
                  <h3>{course.title}</h3>
                  <p>{course.description.substring(0, 80)}...</p>

                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="progress-text">
                    Progress: {course.progress}%
                  </div>

                  <div className="actions">
                    <button
                      className="btn continue"
                      onClick={() =>
                        updateProgress(
                          course.enrollmentId,
                          course.progress
                        )
                      }
                    >
                      Continue ▶
                    </button>

                    <button
                      className="btn remove"
                      onClick={() =>
                        removeCourse(course.enrollmentId)
                      }
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}