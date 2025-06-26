import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const storedUser = localStorage.getItem("muhurthamUser");

  // If no user in localStorage
  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(storedUser);

  // If route is admin-only and user is not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow route access
  return children;
};

export default ProtectedRoute;
