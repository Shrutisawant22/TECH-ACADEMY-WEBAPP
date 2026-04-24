// ==========================
// 📁 src/admin/pages/AdminLogin.jsx (ULTRA ADVANCED)
// ==========================
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAdminAuth from "../hooks/useAdminAuth";

export default function AdminLogin() {
  const { loginAdmin } = useAdminAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const err = await loginAdmin(form.email, form.password);

    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="left">
        <h1>Tech Academy Admin</h1>
        <p>Manage users, courses, and analytics in one place 🚀</p>
      </div>

      {/* RIGHT SIDE */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Admin Login 🔐</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>

      {/* STYLES */}
      <style>{`
        .login-page {
          display: flex;
          min-height: 100vh;
          background: radial-gradient(circle at top, #020617, #0f172a);
          color: white;
        }

        .left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
        }

        .left h1 {
          font-size: 40px;
        }

        .left p {
          margin-top: 10px;
          color: #94a3b8;
        }

        .card {
          width: 400px;
          margin: auto;
          padding: 30px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
        }

        .card h2 {
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 10px;
          border: none;
          background: #1e293b;
          color: white;
        }

        button {
          width: 100%;
          margin-top: 15px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          color: white;
          cursor: pointer;
        }

        .error {
          color: #ef4444;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .left {
            display: none;
          }

          .card {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}