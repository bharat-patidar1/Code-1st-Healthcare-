import { Routes, Route } from "react-router-dom";
import EmployeeNavbar from "../components/EmployeeNavbar";
import Attendance from "./Attendance";
import Profile from "./Profile";

function EmployeeRoutes() {
  return (
    <>
      <EmployeeNavbar />
      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default EmployeeRoutes;
