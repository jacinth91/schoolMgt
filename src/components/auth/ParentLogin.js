import React, { useState } from "react";
import { KeyRound, UserRound, ArrowRight, Lock, ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/auth.css"; // Ensure CSS is imported properly


const ParentLogin = () => {
  const [userId, setUserId] = useState("");
  const [authMethod, setAuthMethod] = useState('select');
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  //const [generatedOtp, setGeneratedOtp] = useState("");

  const handleUserIdSubmit = (e) => {
    // e.preventDefault();
    // const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    // setGeneratedOtp(newOtp);
    // console.log('Generated OTP:', newOtp);
  };

  const handlePasswordSubmit = (e) => {
    // e.preventDefault();
    // if (password === 'demo123') {
    //   alert('Login successful!');
    // } else {
    //   alert('Invalid password. Please try again.');
    // }
  };

  const handleOtpSubmit = (e) => {
    // e.preventDefault();
    // if (otp === generatedOtp) {
    //   alert('Login successful!');
    // } else {
    //   alert('Invalid OTP. Please try again.');
    // }
  };

  return (
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
                    <span>Use Password</span>
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
                    <span>Use OTP</span>
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
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control input-with-icon"
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                </div>

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
