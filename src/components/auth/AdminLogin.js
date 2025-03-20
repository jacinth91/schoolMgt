import React, { useEffect, useRef, useState } from "react";
import { UserRound, ArrowRight, Lock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/auth.css"; // Ensure CSS is imported properly
import { loadingChange, login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FullPageSpinner from "../layout/FullPageSpinner";

const AdminLogin = () => {
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const [showError, setShowError] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loadingChange(true));
    if (userId && password) {
      dispatch(login({ username: userId, password: password }));
    } else {
      alert("Invalid credentials. Please try again.");
    }
    setShowError(true);
  };

  return isAuthenticated ? (
    <Navigate to="/admin-dashboard" />
  ) : loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <form onSubmit={handleLoginSubmit} className="auth-card">
              <div className="text-center">
                <h1 className="auth-title">Admin Login</h1>
                <p className="auth-subtitle">
                  Enter your credentials to continue
                </p>
              </div>

              <div className="mb-4">
                <div className="input-icon-wrapper">
                  <UserRound className="input-icon" size={20} />
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="form-control input-with-icon"
                    placeholder="Enter Username"
                    ref={inputRef}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-icon-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control input-with-icon"
                    placeholder="Enter Password"
                    required
                  />
                </div>
              </div>
              {error && userId && password && showError && (
                <div className="text-danger mb-2 h6">{error.message}</div>
              )}

              <button
                type="submit"
                className="btn auth-btn auth-btn-password w-100 mb-3"
              >
                <span>Login</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
