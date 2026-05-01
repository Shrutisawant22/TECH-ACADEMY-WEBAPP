// ==========================
// 🌐 GLOBAL API CONFIG
// ==========================

const BASE_URL = "https://tech-academy-api-7ayl.onrender.com/api";

// ==========================
// 🔐 TOKEN HANDLERS
// ==========================
const getUserToken = () => localStorage.getItem("token");
const getAdminToken = () => localStorage.getItem("adminToken");

// ==========================
// ⚡ GENERIC REQUEST FUNCTION
// ==========================
const request = async (endpoint, options = {}, isAdmin = false) => {
  try {
    const token = isAdmin ? getAdminToken() : getUserToken();

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...options
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (err) {
    console.error("🚨 API ERROR:", err.message);
    throw err;
  }
};

// ==========================
// 👤 USER APIs
// ==========================

export const loginUser = (body) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(body)
  });

export const registerUser = (body) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(body)
  });

export const getCourses = () =>
  request("/courses");

export const getMyCourses = () =>
  request("/enrollments/my-courses");

// ✅ FIXED HERE (IMPORTANT)
export const enrollCourse = (courseId) =>
  request("/enrollments", {
    method: "POST",
    body: JSON.stringify({ courseId })
  });

export const checkoutCourse = (courseId) =>
  request(`/payment/checkout/${courseId}`, {
    method: "POST"
  });

// ==========================
// 🛠 ADMIN APIs
// ==========================

export const adminLogin = (body) =>
  request("/admin/login", {
    method: "POST",
    body: JSON.stringify(body)
  }, true);

export const getDashboard = () =>
  request("/admin/dashboard", {}, true);

export const getUsers = (page = 1) =>
  request(`/admin/users?page=${page}`, {}, true);

export const deleteUser = (id) =>
  request(`/admin/users/${id}`, {
    method: "DELETE"
  }, true);

export const getAdminCourses = (page = 1) =>
  request(`/admin/courses?page=${page}`, {}, true);

export const deleteCourse = (id) =>
  request(`/admin/courses/${id}`, {
    method: "DELETE"
  }, true);

export const updateCourse = (id, body) =>
  request(`/admin/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(body)
  }, true);

export const getEnrollments = (page = 1) =>
  request(`/admin/enrollments?page=${page}`, {}, true);
