// ==========================
// 📁 UPDATED Courses.jsx (FIX PRICE DISPLAY PROPERLY)
// ==========================
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { motion } from "framer-motion";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("adminToken");

  // ==========================
  // 📡 FETCH COURSES
  // ==========================
  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setCourses(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);

  // ==========================
  // ❌ DELETE COURSE
  // ==========================
  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Failed ❌");
    }
  };

  // ==========================
  // 📊 TABLE CONFIG
  // ==========================
  const columns = [
    {
      key: "thumbnail",
      label: "Course",
      render: (val, row) => (
        <div className="course-cell">
          <img src={val} alt="" />
          <div>
            <p>{row.title}</p>
            <span>{row.category}</span>
          </div>
        </div>
      )
    },
    {
      key: "level",
      label: "Level"
    },
    {
      key: "price",
      label: "Price",
      render: (val, row) => {
        // 🔥 FIX: handle 0, string, undefined
        const price =
          row.price !== undefined && row.price !== null
            ? row.price
            : "Free";

        return `₹${price}`;
      }
    },
    {
      key: "studentsEnrolled",
      label: "Students"
    },
    {
      key: "rating",
      label: "Rating",
      render: (val) => `⭐ ${val || 0}`
    },
    {
      key: "_id",
      label: "Actions",
      render: (val) => (
        <div className="actions">
          <button className="edit">Edit</button>
          <button
            className="delete"
            onClick={() => deleteCourse(val)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>📚 Manage Courses</h2>

      <DataTable
        columns={columns}
        data={courses}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        actions={[
          {
            label: "➕ Add Course",
            onClick: () => alert("Add Course")
          }
        ]}
      />

      <style>{`
        .page {
          padding: 10px;
        }

        h2 {
          margin-bottom: 20px;
        }

        .course-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .course-cell img {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          object-fit: cover;
        }

        .course-cell span {
          font-size: 12px;
          color: #94a3b8;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .actions button {
          padding: 6px 10px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }

        .edit {
          background: #6366f1;
          color: white;
        }

        .delete {
          background: #ef4444;
          color: white;
        }
      `}</style>
    </motion.div>
  );
}