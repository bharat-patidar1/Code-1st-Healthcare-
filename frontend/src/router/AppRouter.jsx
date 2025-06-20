// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import AdminRoutes from "../admin/routes";
import EmployeeRoutes from "../employee/pages";
import Login from "../auth/Login";
import { toast } from "sonner";

function AppRouter() {
  const { user } = useAuth();

  if (!user) return <Login />;
  if (user.role === "admin") return <AdminRoutes />;
  if (user.role === "employee") return <EmployeeRoutes />;

  toast.error("Invalid user role. Please log in again.");
  return <Navigate to="/login" />;
}

export default AppRouter;