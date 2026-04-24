import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/courses");
      }
    } catch {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          overflow: hidden;
        }

        .background-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.4), transparent);
          filter: blur(100px);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }

        .card {
          position: relative;
          width: 380px;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title {
          font-size: 28px;
          font-weight: bold;
          color: white;
          text-align: center;
        }

        .subtitle {
          text-align: center;
          color: #cbd5f5;
          margin-bottom: 25px;
        }

        .input-group {
          position: relative;
          margin-bottom: 22px;
        }

        .input-group input {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
          transition: 0.3s;
        }

        .input-group input:focus {
          box-shadow: 0 0 10px rgba(99,102,241,0.8);
        }

        .input-group label {
          position: absolute;
          left: 14px;
          top: 14px;
          color: #cbd5f5;
          transition: 0.3s;
        }

        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
          top: -8px;
          font-size: 12px;
          color: #6366f1;
        }

        .eye {
          position: absolute;
          right: 12px;
          top: 12px;
          cursor: pointer;
          color: #cbd5f5;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 25px rgba(99,102,241,0.5);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          color: #f87171;
          text-align: center;
          margin-bottom: 10px;
        }

        .bottom {
          margin-top: 20px;
          text-align: center;
          color: #cbd5f5;
        }

        .bottom span {
          color: #818cf8;
          cursor: pointer;
          font-weight: 600;
        }

        .bottom span:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="container">
        <div className="background-glow"></div>

        <div className="card">
          <h1 className="title">Tech Academy 🚀</h1>
          <p className="subtitle">Unlock your learning journey</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <span className="eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            <button className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="bottom">
            New here?{" "}
            <span onClick={() => navigate("/register")}>
              Create Account
            </span>
          </p>
        </div>
      </div>
    </>
  );
}