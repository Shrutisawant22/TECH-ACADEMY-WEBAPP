// ==========================
// 📁 src/admin/services/adminApi.js (ADVANCED)
// ==========================

const BASE_URL = "http://localhost:5000/api/admin";

// ==========================
// 🔐 GET TOKEN
// ==========================
const getToken = () => {
  return localStorage.getItem("adminToken");
};

// ==========================
// 🌐 GENERIC REQUEST HANDLER
// ==========================
const request = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      ...options
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (err) {
    console.error("API ERROR:", err.message);
    throw err;
  }
};

// ==========================
// 🔐 AUTH
// ==========================
export const adminLogin = (body) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify(body)
  });

// ==========================
// 📊 DASHBOARD
// ==========================
export const getDashboard = () =>
  request("/dashboard");

// ==========================
// 👥 USERS
// ==========================
export const getUsers = (page = 1) =>
  request(`/users?page=${page}`);

export const deleteUser = (id) =>
  request(`/users/${id}`, {
    method: "DELETE"
  });

// ==========================
// 📚 COURSES (ADMIN)
// ==========================
export const getCourses = (page = 1) =>
  request(`/courses?page=${page}`);

export const deleteCourse = (id) =>
  request(`/courses/${id}`, {
    method: "DELETE"
  });

export const updateCourse = (id, body) =>
  request(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(body)
  });

// ==========================
// 🧾 ENROLLMENTS
// ==========================
export const getEnrollments = (page = 1) =>
  request(`/enrollments?page=${page}`);

// ==========================
// ⚙️ UTIL (OPTIONAL)
// ==========================
export const bulkDeleteUsers = async (ids = []) => {
  return request(`/users/bulk-delete`, {
    method: "POST",
    body: JSON.stringify({ ids })
  });
};