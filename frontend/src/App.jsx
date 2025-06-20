import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard.jsx';
import Attendance from './pages/Attendance.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppRouter from './router/AppRouter.jsx';

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/employee/dashboard"
        element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>}
      />
      <Route
        path="/attendance"
        element={<ProtectedRoute role="employee"><Attendance /></ProtectedRoute>}
      />
    </Routes>
    </>
  );
};

export default App;
