import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirect = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  console.log(isAuthenticated);

  if (loading) return null; // Avoid redirecting while authentication is being checked

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthRedirect;
