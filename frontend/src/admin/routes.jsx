import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Messages from "./pages/Messages";

function AdminRoutes() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;