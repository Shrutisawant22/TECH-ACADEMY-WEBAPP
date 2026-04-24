import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// ==========================
// ⚡ LAZY LOAD
// ==========================
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Courses = lazy(() => import("./pages/Courses"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Navbar = lazy(() => import("./components/Navbar"));

// ==========================
// 🔐 AUTH CHECK
// ==========================
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// ==========================
// 🔐 PROTECTED ROUTE
// ==========================
const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

// ==========================
// 🧭 MAIN LAYOUT
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
// ⏳ LOADER UI
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
// 🚀 APP ROUTES
// ==========================
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* ========================== */}
        {/* 🔓 PUBLIC ROUTES */}
        {/* ========================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ========================== */}
        {/* 🔐 PROTECTED ROUTES */}
        {/* ========================== */}
        <Route element={<ProtectedRoute />}>

          {/* Layout with Navbar */}
          <Route element={<MainLayout />}>

            <Route path="/courses" element={<Courses />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />

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