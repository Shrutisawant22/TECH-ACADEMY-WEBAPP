// ==========================
// 📁 src/admin/hooks/useAdminAuth.js (ADVANCED)
// ==========================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAdminAuth() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // 🔍 VERIFY ADMIN TOKEN
  // ==========================
  const verifyAdmin = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setLoading(false);
      return navigate("/admin/login");
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      setAdmin({
        token,
        data
      });

    } catch (err) {
      console.error("Admin Auth Error:", err.message);
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // 🔐 LOGIN ADMIN
  // ==========================
  const loginAdmin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("adminToken", data.token);

      setAdmin({
        token: data.token,
        user: data.data
      });

      navigate("/admin/dashboard");

    } catch (err) {
      return err.message;
    }
  };

  // ==========================
  // 🔓 LOGOUT
  // ==========================
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    navigate("/admin/login");
  };

  // ==========================
  // ⚡ INIT
  // ==========================
  useEffect(() => {
    verifyAdmin();
  }, []);

  return {
    admin,
    loading,
    loginAdmin,
    logoutAdmin
  };
}