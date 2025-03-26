import React, { useEffect, useRef, useState } from "react";
import {
  KeyRound,
  UserRound,
  ArrowRight,
  Lock,
  ArrowLeft,
  Mail,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ParentLogin.css";
import { loadingChange, login, sendOTP, verifyOTP } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FullPageSpinner from "../layout/FullPageSpinner";
import { toast } from "react-toastify";

const ParentLogin = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [authMethod, setAuthMethod] = useState("select");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(loadingChange(true));
    if (password.length) {
      dispatch(login({ username: userId, password: password }));
    } else {
      toast.error("Invalid password. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(loadingChange(true));
    if (otp.length) {
      dispatch(verifyOTP({ usid: userId, otp: otp }));
    } else {
      toast.error("Please enter OTP.", {
        position: "top-right",
      });
    }
  };

  const triggerOTP = async () => {
    if (userId) {
      setOtpLoading(true);
      try {
        await sendOTP(userId);
      } catch (error) {
      } finally {
        setOtpLoading(false);
        setAuthMethod("otp");
      }
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;
  if (loading) return <FullPageSpinner loading={loading} />;

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 mb-5">
            <div className="user-icon-container">
              <div className="user-icon">
                <UserRound size={40} />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="auth-card p-4 shadow-sm rounded">
              <div className="text-center">
                <h2 className="auth-title mb-3">Welcome Back</h2>
                <p className="auth-subtitle">
                  Please enter your details to continue
                </p>
              </div>

              {authMethod === "select" &&
                (otpLoading ? (
                  <FullPageSpinner loading={otpLoading} />
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="input-icon-wrapper">
                        <Mail className="input-icon" size={20} />
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

                    <div className="col-12">
                      <button
                        type="button"
                        onClick={() => userId && setAuthMethod("password")}
                        className="btn btn-primary w-100 mb-3"
                        disabled={!userId}
                      >
                        <Lock size={20} className="me-2" /> Continue with
                        Password
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerOTP()}
                        className="btn btn-secondary w-100"
                        disabled={!userId}
                      >
                        <KeyRound size={20} className="me-2" /> Continue with
                        OTP
                      </button>
                    </div>
                  </>
                ))}

              {authMethod === "password" && (
                <form onSubmit={handlePasswordSubmit}>
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

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    <ArrowRight size={20} className="me-2" /> Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod("select")}
                    className="btn btn-light w-100"
                  >
                    <ArrowLeft size={20} className="me-2" /> Back
                  </button>
                </form>
              )}

              {authMethod === "otp" && (
                <form onSubmit={handleOtpSubmit}>
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
                    className="btn btn-secondary w-100 mb-3"
                  >
                    <ArrowRight size={20} className="me-2" /> Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod("select")}
                    className="btn btn-light w-100"
                  >
                    <ArrowLeft size={20} className="me-2" /> Back
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
