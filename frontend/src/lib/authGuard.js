import { Navigate } from "react-router-dom";

export function AuthGuard({ children, allowedRoles, user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are defined, check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
