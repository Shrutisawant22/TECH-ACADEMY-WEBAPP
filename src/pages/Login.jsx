// ==========================
// 📁 Login.jsx (ULTRA PREMIUM UI + WORKING AUTH)
// ==========================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/courses");
      }
    } catch {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      {/* BACKGROUND ANIMATION */}
      <div className="bg"></div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>🚀 Tech Academy</h1>
        <p className="subtitle">Upgrade your skills. Build your future.</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>

          <div className="input-box">
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/login")}
        >
          🔐 Admin Login
        </button>

        <p className="bottom">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </motion.div>

      {/* STYLES */}
      <style>{`
        .login-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #020617;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 20%, #6366f1, transparent),
                      radial-gradient(circle at 80% 80%, #8b5cf6, transparent),
                      radial-gradient(circle at 50% 50%, #22c55e, transparent);
          filter: blur(120px);
          animation: move 10s infinite alternate;
        }

        @keyframes move {
          from { transform: translate(0,0); }
          to { transform: translate(-60px,-40px); }
        }

        .card {
          position: relative;
          z-index: 2;
          width: 380px;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          color: white;
        }

        h1 {
          text-align: center;
          margin-bottom: 5px;
        }

        .subtitle {
          text-align: center;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .input-box {
          position: relative;
          margin-bottom: 20px;
        }

        .input-box input {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .input-box label {
          position: absolute;
          left: 12px;
          top: 14px;
          color: #94a3b8;
          transition: 0.3s;
        }

        .input-box input:focus + label,
        .input-box input:not(:placeholder-shown) + label {
          top: -8px;
          font-size: 12px;
          color: #6366f1;
        }

        .input-box span {
          position: absolute;
          right: 10px;
          top: 12px;
          cursor: pointer;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          color: white;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99,102,241,0.4);
        }

        .admin-btn {
          width: 100%;
          margin-top: 12px;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #6366f1;
          background: transparent;
          color: #a5b4fc;
          cursor: pointer;
        }

        .admin-btn:hover {
          background: #6366f1;
          color: white;
        }

        .error {
          background: rgba(239,68,68,0.1);
          color: #f87171;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 10px;
          text-align: center;
        }

        .bottom {
          text-align: center;
          margin-top: 15px;
          color: #94a3b8;
        }

        .bottom span {
          color: #818cf8;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}