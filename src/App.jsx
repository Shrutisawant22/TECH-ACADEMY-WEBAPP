// ==========================
// 📁 src/App.jsx (ADVANCED FULL ROUTING WITH ADMIN)
// ==========================
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// ==========================
// ⚡ USER LAZY LOAD
// ==========================
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Courses = lazy(() => import("./pages/Courses"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Navbar = lazy(() => import("./components/Navbar"));

// ==========================
// ⚡ ADMIN LAZY LOAD
// ==========================
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Users = lazy(() => import("./admin/pages/Users"));
const AdminCourses = lazy(() => import("./admin/pages/Courses"));
const Enrollments = lazy(() => import("./admin/pages/Enrollments"));

// ==========================
// 🔐 AUTH CHECKS
// ==========================
const isUserAuth = () => !!localStorage.getItem("token");
const isAdminAuth = () => !!localStorage.getItem("adminToken");

// ==========================
// 🔐 USER PROTECTED ROUTE
// ==========================
const UserProtected = () => {
  return isUserAuth() ? <Outlet /> : <Navigate to="/" replace />;
};

// ==========================
// 🔐 ADMIN PROTECTED ROUTE
// ==========================
const AdminProtected = () => {
  return isAdminAuth() ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

// ==========================
// 🧭 USER LAYOUT
// ==========================
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

// ==========================
// ⏳ LOADER
// ==========================
const Loader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5rem",
      background: "#020617",
      color: "white"
    }}
  >
    🚀 Loading...
  </div>
);

// ==========================
// 🚀 ROUTES
// ==========================
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* ========================== */}
        {/* 🔓 USER PUBLIC */}
        {/* ========================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ========================== */}
        {/* 🔐 USER PROTECTED */}
        {/* ========================== */}
        <Route element={<UserProtected />}>
          <Route element={<MainLayout />}>
            <Route path="/courses" element={<Courses />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />
          </Route>
        </Route>

        {/* ========================== */}
        {/* 🔓 ADMIN PUBLIC */}
        {/* ========================== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ========================== */}
        {/* 🔐 ADMIN PROTECTED */}
        {/* ========================== */}
        <Route element={<AdminProtected />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/enrollments" element={<Enrollments />} />
          </Route>
        </Route>

        {/* ========================== */}
        {/* ❌ FALLBACK */}
        {/* ========================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}