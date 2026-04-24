import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") checkStrength(value);
  };

  const checkStrength = (pass) => {
    if (pass.length < 6) setStrength("Weak");
    else if (/[A-Z]/.test(pass) && /[0-9]/.test(pass))
      setStrength("Strong");
    else setStrength("Medium");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Account created 🎉 Redirecting...");
        setTimeout(() => navigate("/"), 1500);
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

        .glow1, .glow2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.5;
          animation: float 8s ease-in-out infinite;
        }

        .glow1 {
          background: #6366f1;
          top: -100px;
          left: -100px;
        }

        .glow2 {
          background: #ec4899;
          bottom: -100px;
          right: -100px;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }

        .card {
          position: relative;
          width: 400px;
          padding: 40px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h2 {
          text-align: center;
          color: white;
        }

        .sub {
          text-align: center;
          color: #cbd5f5;
          margin-bottom: 20px;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-group input {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
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
          color: #818cf8;
        }

        .toggle {
          position: absolute;
          right: 12px;
          top: 12px;
          cursor: pointer;
        }

        .strength-bar {
          height: 6px;
          border-radius: 5px;
          margin-top: 5px;
          background: ${
            strength === "Weak"
              ? "#ef4444"
              : strength === "Medium"
              ? "#facc15"
              : "#22c55e"
          };
          width: ${
            strength === "Weak"
              ? "30%"
              : strength === "Medium"
              ? "60%"
              : "100%"
          };
          transition: 0.3s;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 25px rgba(236,72,153,0.5);
        }

        .error {
          color: #f87171;
          text-align: center;
          margin-bottom: 10px;
        }

        .success {
          color: #22c55e;
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
        <div className="glow1"></div>
        <div className="glow2"></div>

        <div className="card">
          <h2>Join Tech Academy 🚀</h2>
          <p className="sub">Start your learning journey today</p>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input name="name" placeholder=" " required onChange={handleChange}/>
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input type="email" name="email" placeholder=" " required onChange={handleChange}/>
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label>Password</label>
              <span className="toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
              {form.password && <div className="strength-bar"></div>}
            </div>

            <div className="input-group">
              <input type="password" name="confirm" placeholder=" " required onChange={handleChange}/>
              <label>Confirm Password</label>
            </div>

            <button className="btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="bottom">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </>
  );
}