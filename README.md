# 🚀 Tech Academy Web App (Frontend)

A **modern, premium UI EdTech platform frontend** built with **React (Vite)**, featuring smooth animations, advanced UX, and seamless integration with the Tech Academy backend.

 

## 📌 Overview

Tech Academy Web App delivers a **high-performance learning experience** with:

* 🎨 Premium UI/UX (Glassmorphism + Animations)
* 🔐 Secure Authentication (JWT)
* 📚 Course Browsing & Filtering
* 🧾 Enrollment System
* 💳 Checkout Flow (UPI / Payment Ready)
* 📊 Admin Dashboard Panel
* ⚡ Optimized Performance with Lazy Loading

 

## 🏗️ Tech Stack

| Layer      | Technology              |
|    - |        -- |
| Framework  | React (Vite)            |
| Routing    | React Router            |
| Animations | Framer Motion           |
| Styling    | CSS (Custom Premium UI) |
| State      | React Hooks             |
| API Calls  | Fetch API               |

 

## 📂 Project Structure

```id="f0b3n2"
frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── DataTable.jsx
│   │   ├── StatCard.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Courses.jsx
│   │   ├── MyCourses.jsx
│   │   └── Checkout.jsx
│   │
│   ├── admin/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Courses.jsx
│   │   │   └── Enrollments.jsx
│   │   └── services/
│   │       └── adminApi.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│
├── index.html
├── package.json
└── vite.config.js
```

 

## 🔐 Authentication Flow

* User logs in → JWT token stored in `localStorage`
* Token is sent with every API request:

```id="p2rm0x"
Authorization: Bearer <token>
```

* Protected routes restrict unauthorized access

 

## 👤 User Features

* Register / Login
* Browse courses with filters
* View course details
* Enroll in courses
* Track progress
* Checkout (Payment simulation / UPI)

 

## 🛠️ Admin Panel Features

* 🔐 Admin Login
* 📊 Dashboard with analytics
* 👥 View all users
* 📚 Manage courses
* 🧾 View enrollments
* 💳 Payment method tracking

 

## 🎨 UI/UX Highlights

* Glassmorphism design
* Smooth animations (Framer Motion)
* Responsive layout (mobile-friendly)
* Skeleton loaders
* Debounced search
* Interactive hover effects

 

## ⚙️ Environment Setup

Create `.env` file:

```id="ax9p1n"
VITE_API_URL=http://localhost:5000/api
```

 

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash id="i3czgd"
git clone https://github.com/Shrutisawant22/TECH-ACADEMY-WEBAPP.git
cd TECH-ACADEMY-WEBAPP
```

 

### 2️⃣ Install Dependencies

```bash id="9j5d4m"
npm install
```

 

### 3️⃣ Start Development Server

```bash id="n4e8o7"
npm run dev
```

👉 App runs on:

```id="2tfz5g"
http://localhost:5173
```

 

## 🔗 Backend Requirement

Make sure backend is running:

```id="u6k9pz"
http://localhost:5000
```

 

## 🔄 API Integration

All APIs connect to:

```id="b4x2yt"
http://localhost:5000/api
```

 

## 📦 Key Functional Modules

* Authentication (Login/Register)
* Course Listing & Filtering
* Enrollment System
* Checkout Flow
* Admin Dashboard
* Data Tables with Pagination


## ⚡ Performance Optimizations

* Lazy loading (React Suspense)
* Debounced search input
* API caching (304 responses)
* Optimized re-renders
* Clean component structure


## 🛡️ Security Features

* JWT-based authentication
* Protected routes
* Token validation
* Admin role-based routing


## 📌 Future Enhancements

* 💳 Stripe / Razorpay integration
* 📜 Certificate download system
* 📈 Graph-based analytics
* 🔔 Notifications
* 🌙 Dark/Light theme toggle
* 📱 Mobile app (React Native)


## 👩‍💻 Author

**Shruti Sawant**
Full Stack Developer 🚀
