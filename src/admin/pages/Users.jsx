// ==========================
// 📁 src/admin/pages/Users.jsx (ULTRA ADVANCED)
// ==========================
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataTable from "../components/DataTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("adminToken");

  // ==========================
  // 📡 FETCH USERS
  // ==========================
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setUsers(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // ==========================
  // ❌ DELETE USER
  // ==========================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      alert("Failed ❌");
    }
  };

  // ==========================
  // 📊 TABLE CONFIG
  // ==========================
  const columns = [
    {
      key: "name",
      label: "User",
      render: (val, row) => (
        <div className="user-cell">
          <img
            src={row.avatar}
            alt=""
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/40")
            }
          />
          <div>
            <p>{val}</p>
            <span>{row.email}</span>
          </div>
        </div>
      )
    },
    {
      key: "role",
      label: "Role",
      render: (val) => (
        <span className={`badge ${val}`}>
          {val}
        </span>
      )
    },
    {
      key: "createdAt",
      label: "Joined",
      render: (val) =>
        new Date(val).toLocaleDateString()
    },
    {
      key: "_id",
      label: "Actions",
      render: (val) => (
        <div className="actions">
          <button className="view">View</button>
          <button
            className="delete"
            onClick={() => deleteUser(val)}
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
      <h2>👥 Users</h2>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        selectable
      />

      {/* STYLES */}
      <style>{`
        .page {
          padding: 10px;
        }

        h2 {
          margin-bottom: 20px;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-cell img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-cell span {
          font-size: 12px;
          color: #94a3b8;
        }

        .badge {
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 12px;
        }

        .admin {
          background: #6366f1;
          color: white;
        }

        .student {
          background: #22c55e;
          color: white;
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

        .view {
          background: #3b82f6;
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