import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) return null; // Avoid redirecting while checking auth state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Renders the nested route
};

export default PrivateRoute;
