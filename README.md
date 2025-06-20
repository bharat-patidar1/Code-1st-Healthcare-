# 🏥 Code 1st Healthcare Management System

A role-based employee and attendance management system built using the **MERN stack** with a sleek modern frontend powered by **Vite, Tailwind CSS, and shadcn/ui**.

---

## 📌 Features

### 👨‍💼 Admin
- Invite employees via email (with temporary password)
- Manage and view all employees
- Track attendance across employees
- Admin dashboard with key metrics

### 👩‍⚕️ Employee
- Secure login with JWT
- View personal dashboard
- Clock in / Clock out attendance
- View personal attendance history

---

## 🛠️ Tech Stack

### 🔗 Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Email invitation (via nodemailer)
- Modular architecture

### 🖥️ Frontend
- React + Vite
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- React Router v6
- Axios (with token interceptor)

---

## 🗂️ Project Structure

├── backend/
│ ├── models/ # Mongoose models (Admin, Employee, Attendance)
│ ├── controllers/ # Business logic
│ ├── routes/ # Express routers
│ ├── middlewares/ # Auth & role check
│ ├── utils/ # Email + password utilities
│ ├── config/ # DB config
│ └── server.js # Entry point (port 8000)
│
├── frontend/
│ ├── components/ # Navbar, ProtectedRoute
│ ├── pages/ # Home, Login, Signup, Dashboards, Attendance
│ ├── lib/ # Axios instance
│ ├── App.jsx # Routes
│ └── main.jsx # App bootstrapping