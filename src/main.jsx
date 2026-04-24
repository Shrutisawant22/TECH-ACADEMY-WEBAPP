import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// ==========================
// ⚡ LAZY LOAD APP (PERFORMANCE)
// ==========================
const App = lazy(() => import("./App.jsx"));

// ==========================
// 🎨 GLOBAL THEME INIT
// ==========================
const applyTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";

  document.documentElement.setAttribute("data-theme", savedTheme);

  // Smooth background transition
  document.body.style.transition = "background 0.3s ease";

  if (savedTheme === "dark") {
    document.body.style.background =
      "linear-gradient(135deg, #0f172a, #1e293b)";
    document.body.style.color = "#fff";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #e0f2fe, #f8fafc)";
    document.body.style.color = "#111";
  }
};

// Apply theme before render
applyTheme();

// ==========================
// ⏳ LOADING UI
// ==========================
const Loader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5rem",
      backdropFilter: "blur(10px)"
    }}
  >
    🚀 Loading Tech Academy...
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