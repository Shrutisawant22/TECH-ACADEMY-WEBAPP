// ==========================
// 📁 UPDATED Enrollments.jsx (FIX PRICE DISPLAY)
// ==========================
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { motion } from "framer-motion";

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("adminToken");

  // ==========================
  // 📡 FETCH ENROLLMENTS
  // ==========================
  const fetchEnrollments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/enrollments?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setEnrollments(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [page]);

  // ==========================
  // 📊 TABLE CONFIG
  // ==========================
  const columns = [
    {
      key: "user",
      label: "User",
      render: (_, row) => (
        <div className="user">
          <p>{row.user?.name}</p>
          <span>{row.user?.email}</span>
        </div>
      )
    },
    {
      key: "course",
      label: "Course",
      render: (_, row) => {
        const price =
          row.course?.price !== undefined && row.course?.price !== null
            ? row.course.price
            : "Free";

        return (
          <div>
            <p>{row.course?.title}</p>
            <span>₹{price}</span>
          </div>
        );
      }
    },
    {
      key: "paymentMethod",
      label: "Payment",
      render: (val) => (
        <span className={`badge ${val}`}>
          {val?.toUpperCase() || "N/A"}
        </span>
      )
    },
    {
      key: "progress",
      label: "Progress",
      render: (val) => (
        <div className="progress">
          <div
            className="bar"
            style={{ width: `${val || 0}%` }}
          />
          <span>{val || 0}%</span>
        </div>
      )
    },
    {
      key: "createdAt",
      label: "Date",
      render: (val) =>
        new Date(val).toLocaleDateString()
    }
  ];

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>🧾 Enrollments</h2>

      <DataTable
        columns={columns}
        data={enrollments}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <style>{`
        .page {
          padding: 10px;
        }

        h2 {
          margin-bottom: 20px;
        }

        .user span {
          font-size: 12px;
          color: #94a3b8;
        }

        .badge {
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 12px;
        }

        .card {
          background: #6366f1;
          color: white;
        }

        .upi {
          background: #22c55e;
          color: white;
        }

        .progress {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .bar {
          height: 6px;
          background: #22c55e;
          border-radius: 10px;
          flex: 1;
        }
      `}</style>
    </motion.div>
  );
}