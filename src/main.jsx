// ==========================
// 📁 src/main.jsx (ADVANCED BOOTSTRAP + THEME + PERF)
// ==========================
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Global styles (admin + app)
import "./admin/styles/admin.css";

// ==========================
// ⚡ LAZY LOAD APP
// ==========================
const App = lazy(() => import("./App.jsx"));

// ==========================
// 🎨 THEME ENGINE
// ==========================
const THEME_KEY = "theme";

const applyTheme = (theme) => {
  const t = theme || localStorage.getItem(THEME_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", t);

  // smooth transitions
  document.documentElement.style.setProperty(
    "color-scheme",
    t === "dark" ? "dark" : "light"
  );
  document.body.style.transition = "background 0.3s ease, color 0.3s ease";

  if (t === "dark") {
    document.body.style.background =
      "radial-gradient(circle at top, #020617, #0f172a)";
    document.body.style.color = "#fff";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #e0f2fe, #f8fafc)";
    document.body.style.color = "#0f172a";
  }
};

const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

// Expose for toggles (Navbar etc.)
window.__setTheme = setTheme;

// Init before render
applyTheme();

// ==========================
// ⚡ PREFETCH CRITICAL CHUNKS
// ==========================
const prefetch = () => {
  import("./admin/pages/Dashboard");
  import("./admin/pages/Users");
  import("./admin/pages/Enrollments");
};
requestIdleCallback?.(prefetch) || setTimeout(prefetch, 1500);

// ==========================
// ⏳ PREMIUM LOADER
// ==========================
const Loader = () => (
  <div className="boot-loader">
    <div className="logo">⚡ Tech Academy</div>
    <div className="spinner"></div>
    <p>Loading platform...</p>

    <style>{`
      .boot-loader {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle at top, #020617, #0f172a);
        color: white;
        gap: 12px;
      }

      .logo {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.5px;
        opacity: 0.9;
      }

      .spinner {
        width: 42px;
        height: 42px;
        border: 4px solid #1e293b;
        border-top: 4px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      p {
        font-size: 13px;
        color: #94a3b8;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// ==========================
// 🚀 RENDER APP
// ==========================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// ==========================
// 🧠 GLOBAL ERROR HANDLING
// ==========================
window.addEventListener("error", (e) => {
  console.error("Global Error:", e.message);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise:", e.reason);
});