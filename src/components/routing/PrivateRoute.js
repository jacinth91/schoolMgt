import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) return null; // Prevent redirection while authentication state is loading

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render the nested route if authenticated
};

export default PrivateRoute;
