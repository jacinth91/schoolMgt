import React, { useEffect, useRef, useState } from "react";
import { KeyRound, UserRound, ArrowRight, Lock, ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/auth.css"; // Ensure CSS is imported properly
import { loadingChange, login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FullPageSpinner from "../layout/FullPageSpinner";

const ParentLogin = () => {
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [authMethod, setAuthMethod] = useState("select");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const [showError, setShowError] = useState(false);

  //const [generatedOtp, setGeneratedOtp] = useState("");

  const fillPassword = (e) => {
    setShowError(false);
    setPassword(e.target.value);
  };

  const handleUserIdSubmit = (e) => {
    // e.preventDefault();
    // const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    // setGeneratedOtp(newOtp);
    // console.log('Generated OTP:', newOtp);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(loadingChange(true));
    if (password.length) {
      dispatch(login({ username: userId, password: password }));
    } else {
      alert("Invalid password. Please try again.");
    }
    setShowError(true);
  };

  const handleOtpSubmit = (e) => {
    // e.preventDefault();
    // if (otp === generatedOtp) {
    //   alert('Login successful!');
    // } else {
    //   alert('Invalid OTP. Please try again.');
    // }
  };

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            {authMethod === "select" && (
              <div className="auth-card">
                <div className="text-center">
                  <h1 className="auth-title">Welcome Back</h1>
                  <p className="auth-subtitle">
                    Please enter your User ID to continue
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
                      placeholder="Enter User ID"
                      ref={inputRef}
                      required
                    />
                  </div>
                </div>

                <div className="auth-buttons-container">
                  <button
                    type="button"
                    onClick={() => {
                      if (userId) setAuthMethod("password");
                    }}
                    className="btn auth-btn auth-btn-password"
                    disabled={!userId}
                  >
                    <Lock size={20} />
                    <span>Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (userId) {
                        handleUserIdSubmit();
                        setAuthMethod("otp");
                      }
                    }}
                    className="btn auth-btn auth-btn-otp"
                    disabled={!userId}
                  >
                    <KeyRound size={20} />
                    <span>OTP</span>
                  </button>
                </div>
              </div>
            )}

            {authMethod === "password" && (
              <form onSubmit={handlePasswordSubmit} className="auth-card">
                <div className="text-center">
                  <h1 className="auth-title">Password Login</h1>
                  <p className="auth-subtitle">
                    Enter your password to continue
                  </p>
                </div>

                <div className="mb-4">
                  <div className="input-icon-wrapper">
                    <Lock className="input-icon" size={20} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => fillPassword(e)}
                      className="form-control input-with-icon"
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                </div>
                {error && password && showError && (
                  <div className="text-danger mb-2 h6">{error.message}</div>
                )}
                <button
                  type="submit"
                  className="btn auth-btn auth-btn-password w-100 mb-3"
                >
                  <span>Login</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMethod("select")}
                  className="back-btn w-100"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
              </form>
            )}

            {authMethod === "otp" && (
              <form onSubmit={handleOtpSubmit} className="auth-card">
                <div className="text-center">
                  <h1 className="auth-title">Enter OTP</h1>
                  <p className="auth-subtitle">
                    We've sent a one-time password to your registered contact
                  </p>
                </div>

                <div className="mb-4">
                  <div className="input-icon-wrapper">
                    <KeyRound className="input-icon" size={20} />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="form-control input-with-icon"
                      placeholder="Enter OTP"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn auth-btn auth-btn-otp w-100 mb-3"
                >
                  <span>Verify OTP</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMethod("select")}
                  className="back-btn w-100"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
