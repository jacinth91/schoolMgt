import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ParentLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = () => {
    // Mock API call to send OTP
    console.log(
      "Sending OTP to registered mobile number for Student ID:",
      studentId
    );
    setOtpSent(true);
  };

  const verifyOtp = () => {
    // Mock API call to verify OTP
    console.log("Verifying OTP:", otp);
    alert("Login Successful!");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Parent Login</h4>
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            type="text"
            className="form-control"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            disabled={otpSent}
          />
        </div>
        {!otpSent ? (
          <button
            className="btn btn-primary w-100"
            onClick={sendOtp}
            disabled={!studentId}
          >
            Send OTP
          </button>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success w-100"
              onClick={verifyOtp}
              disabled={!otp}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentLogin;
